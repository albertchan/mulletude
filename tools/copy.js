import fs from 'fs';
import gaze from 'gaze';
import path from 'path';
import Promise from 'bluebird';

/**
 * Copies static files to the build folder
 */
async function copy({ watch } = {}) {
    const ncp = Promise.promisify(require('ncp'));

    // create `build/` if not exist
    try {
        fs.statSync('build');
    } catch (error) {
        fs.mkdirSync('build');
    }

    await Promise.all([
        ncp('src/public', 'build/public'),
        ncp('src/locales', 'build/public/locales'),
    ]);

    if (watch) {
        const watcher = await new Promise((resolve, reject) => {
            gaze('src/locales/**/*.*', (err, val) => err ? reject(err) : resolve(val));
        });
        watcher.on('changed', async (file) => {
            const relPath = file.substr(path.join(__dirname, '../src/locales/').length);
            await ncp(`src/locales/${relPath}`, `build/public/locales/${relPath}`);
        });
    };
}

export default copy;
