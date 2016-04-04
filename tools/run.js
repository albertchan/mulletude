/**
 * formatDate helper returns a datetime in the format `yyyy-mm-dd hh:mm:ss`
 *
 * @param {date} time JavaScript date object
 * @return {string} 'yyyy-mm-dd hh:mm:ss'
 *
 */
function formatDate(time) {
    var yyyy = time.getFullYear().toString(),
        mm   = padZero(time.getMonth() + 1, 2),
        dd   = padZero(time.getDate(), 2),
        date = yyyy + '-' + mm + '-' + dd;

    return date + ' ' + time.toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, '$1');
}

/**
 * padZero helper returns a zero padded number
 *
 * @param {number} value
 * @param {number} n number of digits
 * @return {string} zero padded number of n digits
 *
 */
function padZero(value, n) {
    n = n || 2;
    return ('0' + value.toString()).slice(-n);
}

function run(fn, options) {
    const task = typeof fn.default === 'undefined' ? fn : fn.default;
    const start = new Date();

    console.log(`[${formatDate(start)}] Starting '${task.name}'...`);
    return task(options).then(() => {
        const end = new Date();
        const time = end.getTime() - start.getTime();
        console.log(`[${formatDate(end)}] Finished '${task.name}' after ${time} ms`);
    });
}

if (process.mainModule.children.length === 0 && process.argv.length > 2) {
    delete require.cache[__filename];
    const module = require(`./${process.argv[2]}.js`).default;
    run(module).catch(err => console.error(err.stack));
}

export default run;
