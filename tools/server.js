require('babel-core/register')({
    ignore: /node_modules/,
    presets: [ 'es2015', 'stage-0', 'react' ],
    plugins: [ 'transform-runtime' ]
    // plugins: [ 'transform-decorators-legacy', 'transform-runtime' ]
});

var path = require('path');
var rootDir = path.resolve(__dirname, '../src');
var environment = process.env.NODE_ENV || 'development';

/**
 * Define universal constants
 */
global.__CLIENT__ = false;
global.__SERVER__ = true;
global.__DEVELOPMENT__ = environment === 'development';
global.__PRODUCTION__ = environment === 'production';

// https://github.com/halt-hammerzeit/webpack-isomorphic-tools
var WebpackIsomorphicTools = require('webpack-isomorphic-tools');
global.webpackIsomorphicTools = new WebpackIsomorphicTools(require('./webpack.isomorphic.tools'))
    .development(__DEVELOPMENT__)
    .server(rootDir, function() {
        require('../build/server');
    });
