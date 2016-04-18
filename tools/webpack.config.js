import extend from 'extend';
import path from 'path';
import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

// Configuration variables
const DEBUG = !process.argv.includes('--release');
const VERBOSE = process.argv.includes('--verbose');
const AUTOPREFIXER_BROWSERS = [
    'Android 2.3',
    'Android >= 4',
    'Chrome >= 35',
    'Firefox >= 31',
    'Explorer >= 9',
    'iOS >= 7',
    'Opera >= 12',
    'Safari >= 7.1',
];
const GLOBALS = {
    'process.env.NODE_ENV': DEBUG ? '"development"' : '"production"', // double quotes required
    __DEVELOPMENT__: DEBUG,
    __PRODUCTION__: !DEBUG,
};

// webpack-isomorphic-tools
const WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
const webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(require('./webpack.isomorphic.tools'));

// Common configurations to be used for both client.js & server.js bundles
// see https://webpack.github.io/docs/configuration.html
// -----------------------------------------------------------------------------
const config = {
    context: path.resolve(__dirname, '../src'),

    output: {
        path: path.resolve(__dirname, '../build/public'),
        publicPath: '/',
    },

    module: {
        loaders: [
            {
                test: /\.(js|jsx)$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    // https://babeljs.io/docs/usage/options/
                    babelrc: false,
                    presets: [
                        'react',
                        'es2015',
                        'stage-0',
                    ],
                    plugins: [
                        "transform-runtime",
                    ],
                },
            }, {
                test: /\.json$/,
                loader: 'json-loader',
            }, {
                test: /\.scss$/,
                loaders: DEBUG ? [
                    'style-loader',
                    `css-loader?${JSON.stringify({
                        // CSS Modules https://github.com/css-modules/css-modules
                        modules: true,
            
                        importLoaders: 2,
            
                        // localIdentName: '[local]__[hash:base64:5]',
                        localIdentName: '[local]',
            
                        sourceMap: DEBUG,
                    })}`,
                    'postcss-loader?parser=postcss-scss',
                    'sass-loader?outputStyle=expanded&sourceMap=true&sourceMapContents=true'
                ] : [

                ],
            }, {
                test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url?limit=10000&mimetype=application/font-woff"
            }, {
                test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url?limit=10000&mimetype=application/font-woff"
            }, {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url?limit=10000&mimetype=application/octet-stream"
            }, {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                loader: "file"
            }, {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url?limit=10000&mimetype=image/svg+xml"
            },
        ]
    },

    plugins: [
        ...(DEBUG ? [] : [
            // css files from the extract-text-plugin loader
            new ExtractTextPlugin('css/[name]-[chunkhash].css', { allChunks: true }),
        ]),
        DEBUG ? webpackIsomorphicToolsPlugin.development() : webpackIsomorphicToolsPlugin,
    ],

    resolve: {
        root: path.resolve(__dirname, '../src'),
        modulesDirectories: ['node_modules'],
        extensions: ['', '.js', '.jsx', '.json'],
    },

    // for pretty colors in logs
    stats: {
        colors: true,
        reasons: DEBUG,
        hash: VERBOSE,
        version: VERBOSE,
        timings: true,
        chunks: VERBOSE,
        chunkModules: VERBOSE,
        cached: VERBOSE,
        cachedAssets: VERBOSE,
    },

    cache: DEBUG,
    debug: DEBUG,

    postcss(bundler) {
        // https://github.com/postcss/postcss-loader
        return [
            require('autoprefixer')({ browsers: AUTOPREFIXER_BROWSERS }),
        ];
    },
};

// Configuration for client bundle (client.js)
// -----------------------------------------------------------------------------
const clientConfig = extend(true, {}, config, {
    entry: './client.js',

    output: {
        filename: 'js/bundle.js'
    },

    module: {
        preLoaders: [
            {
                test: /\.(js|jsx)$/,
                loader: 'eslint-loader',
                include: __dirname + '/assets',
                exclude: /bundle\.js$/
            }
        ],
    },

    plugins: [
        // Define free variables
        // https://webpack.github.io/docs/list-of-plugins.html#defineplugin
        new webpack.DefinePlugin({ ...GLOBALS, 'process.env.BROWSER': true }),

        new webpack.optimize.OccurrenceOrderPlugin(true),

        ...(DEBUG ? [] : [
            // Search for equal or similar files and deduplicate them in the output
            // https://webpack.github.io/docs/list-of-plugins.html#dedupeplugin
            new webpack.optimize.DedupePlugin(),

            // A plugin for a more aggressive chunk merging strategy
            // https://webpack.github.io/docs/list-of-plugins.html#aggressivemergingplugin
            new webpack.optimize.AggressiveMergingPlugin(),
        ]),
    ],

    target: 'web',

    // Choose a developer tool to enhance debugging
    // http://webpack.github.io/docs/configuration.html#devtool
    devtool: DEBUG ? 'cheap-module-eval-source-map' : false,
});

// Configuration for server bundle (server.js)
// -----------------------------------------------------------------------------
const serverConfig = extend(true, {}, config, {
    entry: './server.js',

    output: {
        filename: '../server.js',
        libraryTarget: 'commonjs2',
    },

    externals: [
        /^\.\/js$/,
        function filter(context, request, cb) {
            const isExternal = request.match(/^[@a-z][a-z\/\.\-0-9]*$/i);
            cb(null, Boolean(isExternal));
        },
    ],

    node: {
        console: false,
        global: false,
        process: false,
        Buffer: false,
        __filename: false,
        __dirname: false,
    },

    target: 'node',

    plugins: [
        // Define free variables
        // https://webpack.github.io/docs/list-of-plugins.html#defineplugin
        new webpack.DefinePlugin({ ...GLOBALS, 'process.env.BROWSER': false }),
    ],

    devtool: 'source-map',
});

export default [clientConfig, serverConfig];
