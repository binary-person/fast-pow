const { parentPort } = require('worker_threads');
const crypto = require('crypto');
const decoder = new TextDecoder();
const encoder = new TextEncoder();

parentPort.on('message', ({ prefix, difficulty, id }) => {
    parentPort.postMessage({ result: solve(prefix, difficulty), id });
});

function solve(prefix, difficulty) {
    const buf = Buffer.allocUnsafe(48).fill(48);
    prefix = encoder.encode(prefix);

    buf.set(prefix, 0);
    buf.set(prefix, 32);

    const zeroes = difficulty - (difficulty % 4);
    const mask1 = (2 ** zeroes - 1) << (32 - zeroes);
    const mask2 = (2 ** (difficulty - zeroes) - 1) << (zeroes - 4);

    while (true) {
        if (solvesDifficulty(sha1(buf), mask1, mask2)) break;
        increment(buf);
    }
    return decoder.decode(buf.subarray(16, 32));
}

function increment(buf) {
    let i = 31;

    buf[i] += 1;
    while (i > 15 && buf[i] === 58) {
        buf[i] = 48;
        buf[--i] += 1;
    }
}
function solvesDifficulty(hash, mask1, mask2) {
    let z = hash[0] * 2 ** 24 + hash[1] * 2 ** 16 + hash[2] * 2 ** 8 + hash[3];

    if ((z & mask1) !== 0) return false;
    if ((z & mask2) !== mask2) return false;

    return true;
}

function sha1(buf) {
    return crypto.createHash('sha1').update(buf).digest();
}
