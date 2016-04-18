import browserSync from 'browser-sync';
import webpack from 'webpack';
import webpackMiddleware from 'webpack-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from './webpack.config';
import clean from './clean';
import copy from './copy';
import run from './run';
import runServer from './runServer';

// Check environment for production
const DEBUG = !process.argv.includes('--release');

/**
 * Launches a development web server with "live reload" functionality -
 * synchronizing URLs, interactions and code changes across multiple devices.
 */
async function start() {
    await run(clean);
    await run(copy);
    await new Promise(resolve => {
        // Patch the client-side bundle configurations
        // to enable Hot Module Replacement (HMR)
        webpackConfig.filter(x => x.target !== 'node').forEach(config => {
            if (Array.isArray(config.entry)) {
                config.entry.unshift('webpack-hot-middleware/client');
            } else {
                config.entry = ['webpack-hot-middleware/client', config.entry];
            }
            config.plugins.push(new webpack.HotModuleReplacementPlugin());
            config.plugins.push(new webpack.NoErrorsPlugin());
            config.module.loaders
                .filter(x => x.loader === 'babel-loader')
                .forEach(x => (x.query = {
                    ...x.query,

                    plugins: [
                        ...(x.query ? x.query.plugins : []),
                        ['react-transform',
                            {
                                transforms: [
                                    {
                                        transform: 'react-transform-hmr',
                                        imports: ['react'],
                                        locals: ['module'],
                                    }, {
                                        transform: 'react-transform-catch-errors',
                                        imports: ['react', 'redbox-react'],
                                    },
                                ],
                            },
                        ],
                    ],
                }));

                // config.module.loaders.push({
                //     test: /\.scss$/,
                //     loaders: DEBUG ? [
                //         'style-loader',
                //         `css-loader?${JSON.stringify({
                //             // CSS Modules https://github.com/css-modules/css-modules
                //             modules: true,
                //
                //             importLoaders: 2,
                //
                //             localIdentName: '[local]__[hash:base64:5]',
                //
                //             sourceMap: DEBUG,
                //         })}`,
                //         'postcss-loader?parser=postcss-scss',
                //         'sass-loader?outputStyle=expanded&sourceMap=true&sourceMapContents=true'
                //     ] : []
                // });
        });

        const bundler = webpack(webpackConfig);
        const wpMiddleware = webpackMiddleware(bundler, {

            // Provide publicPath
            publicPath: webpackConfig[0].output.publicPath,

            // Pretty colored output
            stats: webpackConfig[0].stats,

            noInfo: false,

            // For other settings see
            // https://webpack.github.io/docs/webpack-dev-middleware
        });
        const hotMiddlewares = bundler
            .compilers
            .filter(compiler => compiler.options.target !== 'node')
            .map(compiler => webpackHotMiddleware(compiler));

        // start BrowserSync when bundling is complete
        let handleServerBundleComplete = () => {
            runServer((err, host) => {
                if (!err) {
                    const bs = browserSync.create();
                    bs.init({
                        ...(DEBUG ? {} : { notify: false, ui: false }),

                        proxy: {
                            target: 'localhost:3000', // where the Hapi server is running
                            // target: host,
                            middleware: [wpMiddleware, ...hotMiddlewares],
                        },
                    }, resolve);
                }
                handleServerBundleComplete = runServer;
            });
        };

        // Wait for server bundles to finish before serving
        bundler.plugin('done', () => {
            handleServerBundleComplete()
        });
    });
}

export default start;
