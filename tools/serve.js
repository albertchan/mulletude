require('babel-core/register')({
    ignore: /node_modules/,
    presets: [ 'es2015', 'stage-0', 'react' ],
    plugins: [ 'transform-runtime' ]
    // plugins: [ 'transform-decorators-legacy', 'transform-runtime' ]
});

/**
 * Define universal constants
 */

require("../build/server");
