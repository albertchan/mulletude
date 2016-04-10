import browserSync from 'browser-sync';
import webpack from 'webpack';
import webpackMiddleware from 'webpack-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from './webpack.config';
import clean from './clean';
import copy from './copy';
import run from './run';
import runServer from './runServer';

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
                        proxy: {
                            target: 'localhost:3000', // where the Hapi server is running
                            middleware: [wpMiddleware, ...hotMiddlewares],
                        }
                    }, resolve);
                }
            });
        };

        // Wait for server bundles to finish before serving
        bundler.plugin('done', () => handleServerBundleComplete());
    });
}

export default start;
