const { parentPort } = require('worker_threads');
const crypto = require('crypto');
parentPort.on('message', ({ prefix, difficulty, id }) => {
    parentPort.postMessage({ result: solve(prefix, difficulty), id });
});

function solve(prefix, difficulty) {
    const buf = Buffer.alloc(48, 65);
    prefix = new TextEncoder().encode(prefix);

    buf.set(prefix, 0);
    buf.set(prefix, 32);

    while (true) {
        if (solvesDifficulty(sha1(buf), difficulty)) break;
        increment(buf);
    }
    return new TextDecoder().decode(buf.subarray(16, 32));
}

function increment(buf) {
    let i = 31;

    buf[i] += 1;
    while (i > 15 && buf[i] === 91) {
        buf[i] = 65;
        buf[--i] += 1;
    }
}
function solvesDifficulty(hash, difficulty) {
    let i;
    let n = ~~(difficulty / 4);

    for (i = 0; i < n; i++) {
        if ((hash[~~(i / 2)] & (i & 1 ? 0x0f : 0xf0)) !== 0) return false;
    }

    n = difficulty - 4 * n;
    const nibble = (hash[~~(i / 2)] & (i & 1 ? 0x0f : 0xf0)) >> (!(i & 1) ? 4 : 0);
    if (n !== 0 && (nibble & (2 ** n - 1)) !== 2 ** n - 1) return false;
    return true;
}

function sha1(buf) {
    return crypto.createHash('sha1').update(buf).digest();
}
