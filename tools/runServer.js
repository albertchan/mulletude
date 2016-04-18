import path from 'path';
import cp from 'child_process';
import dateFormat from 'dateformat';
import webpackConfig from './webpack.config';

// Match the text string used in `src/server.js` when server is started
const RUNNING_REGEXP = /Hapi server started at/g;

const { output } = webpackConfig.find(x => x.target === 'node');
const outputPath = path.resolve(__dirname, '../tools');
// const serverPath = path.join(output.path, output.filename);
const serverPath = path.join(outputPath, './server.js');
const format = '[yyyy-mm-dd HH:MM:ss]';
let server;

// Launch or restart the Node.js server
function runServer(cb) {
    if (server) {
        server.kill('SIGTERM');
    }

    server = cp.spawn('babel-node', [serverPath], {
        env: Object.assign({ NODE_ENV: 'development' }, process.env),
        silent: false,
    });

    // server.stdout.on('data', onStdOut);
    server.stdout.on('data', x => onStdOut(x, cb));
    server.stderr.on('data', x => process.stderr.write(x));
}


function onStdOut(data, cb) {
    // const time = new Date().toTimeString();
    const time = new Date();
    const match = data.toString('utf8').match(RUNNING_REGEXP);

    // process.stdout.write(time.replace(/.*(\d{2}:\d{2}:\d{2}).*/, '[$1] '));
    process.stdout.write(dateFormat(time, format));
    process.stdout.write(data);

    if (match) {
        server.stdout.removeListener('data', onStdOut);
        server.stdout.on('data', x => process.stdout.write(x));
        if (cb) {
            cb(null, match[1]);
        }
    }
}

process.on('exit', () => {
    if (server) {
        server.kill('SIGTERM');
    }
});

export default runServer;
