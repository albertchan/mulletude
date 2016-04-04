import 'babel-polyfill';
import webpackConfig from '../tools/webpack.config';

// Hapi server imports
import good from "good";
import Hapi from 'hapi';
import Inert from 'inert';
import Vision from 'vision';
import config from './config';
import handleRender from './handlers/render';

// Check environment for production
const environment = process.env.NODE_ENV || 'development';
global.__DEVELOPMENT__ = environment === 'development';
global.__PRODUCTION__ = environment === 'production';

/**
 * Create and start Hapi server
 */
const debugMode = config.server.debugMode;
const server = new Hapi.Server(debugMode);

// Configure connection
server.connection(config.connection);

// Logging options
const reporterOptions = {
    reporters: [{
        reporter: require('good-console'),
        events: {
            response: '*',
            log: '*',
        }
    }]
};


// Register plugins for server
server.register([
    {
        register: Inert
    }, {
        register: Vision
    }, {
        register: good,
        options: reporterOptions,
    }
], (err) => {
    if (err) {
        throw err;
    }

    // Configure templating engine
    // See https://github.com/hapijs/vision/blob/master/API.md#serverviewsoptions
    server.views({
        engines: {
            html: require('handlebars'),
        },
        relativeTo: __dirname,
        path: 'views'
    });

    // Configure path prefix to locate static resources
    server.path(webpackConfig[0].output.path);

    // Handle routes and serve static requests
    server.route({
        method: 'GET',
        path: '/{params*}',
        handler: {
            directory: {
                index: false,
                listing: false,
                path: '.'
            }
        }
    });

    // Catch dynamic requests here to fire-up React Router.
    server.ext('onPreResponse', (request, reply) => {
        if (typeof request.response.statusCode !== 'undefined') {
            return reply.continue();
        }
        handleRender(request, reply);
    });

    server.start(function () {
        // console.info(dateFormat(new Date(), format), '🌎  ' + environment + ' Hapi server started at', server.info.uri);
        console.info(' 🌎  ' + environment + ' Hapi server started at', server.info.uri);
    });
});
