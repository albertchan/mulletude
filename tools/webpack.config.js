import extend from 'extend';
import path from 'path';
import webpack from 'webpack';
import AssetsPlugin from 'assets-webpack-plugin';

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
                    "plugins": [
                        "transform-runtime",
                    ],
                    "compact" : false,
                },
            }, {
                test: /\.json$/,
                loader: 'json-loader',
            }, {
                test: /\.scss$/,
                loaders: [
                    // https://github.com/kriasoft/isomorphic-style-loader
                    'isomorphic-style-loader',
                    'css-loader?modules&localIdentName=[name]_[local]_[hash:base64:3]',
                    'postcss-loader?parser=postcss-scss',
                    'sass?sourceMap'
                ],
            }
        ]
    },

    resolve: {
        root: path.resolve(__dirname, '../src'),
        modulesDirectories: ['node_modules'],
        extensions: ['', '.webpack.js', '.web.js', '.js', '.jsx', '.json'],
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

    // cache: DEBUG,
    // debug: DEBUG,

    postcss(bundler) {
        // https://github.com/postcss/postcss-loader
        return [
            require('postcss-import')({ addDependencyTo: bundler }),
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
        new AssetsPlugin({
            path: path.resolve(__dirname, '../build'),
            filename: 'assets.js',
            processOutput: x => `module.exports = ${JSON.stringify(x)};`,
        }),

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

    devtool: DEBUG ? 'source-map' : false,
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

    plugins: [],

    devtool: 'source-map',
});

export default [clientConfig, serverConfig];
