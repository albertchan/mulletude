import del from 'del';

/**
 * Cleans up the output (build) directory.
 */
async function clean() {
    await del(['.tmp', 'build/public/*', '!build/.git'], { dot: true });
}

export default clean;
