// ==UserScript==
// @name         pow optimizer local
// @description  made with much love
// @version      0.0.1
// @author       Cazka#1820
// @grant        none
// @match        *://diep.io/*
// @namespace https://greasyfork.org/users/541070
// ==/UserScript==
'use strict';

const WORKER = `
window = self;
/*
 * [js-sha1]{@link https://github.com/emn178/js-sha1}
 *
 * @version 0.6.0
 * @author Chen, Yi-Cyuan [emn178@gmail.com]
 * @copyright Chen, Yi-Cyuan 2014-2017
 * @license MIT
 */
/*jslint bitwise: true */
(function () {
    'use strict';

    var EXTRA = [-2147483648, 8388608, 32768, 128];
    var SHIFT = [24, 16, 8, 0];

    function Sha1() {
        this.blocks = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

        this.h0 = 0x67452301;
        this.h1 = 0xefcdab89;
        this.h2 = 0x98badcfe;
        this.h3 = 0x10325476;
        this.h4 = 0xc3d2e1f0;

        this.block = this.start = this.bytes = this.hBytes = 0;
        this.finalized = this.hashed = false;
    }

    Sha1.prototype.update = function (message) {
        if (this.finalized) {
            return;
        }
        var index = 0,
            i,
            length = message.length || 0,
            blocks = this.blocks;

        while (index < length) {
            if (this.hashed) {
                this.hashed = false;
                blocks[0] = this.block;
                blocks[16] =
                    blocks[1] =
                    blocks[2] =
                    blocks[3] =
                    blocks[4] =
                    blocks[5] =
                    blocks[6] =
                    blocks[7] =
                    blocks[8] =
                    blocks[9] =
                    blocks[10] =
                    blocks[11] =
                    blocks[12] =
                    blocks[13] =
                    blocks[14] =
                    blocks[15] =
                        0;
            }

            for (i = this.start; index < length && i < 64; ++index) {
                blocks[i >> 2] |= message[index] << SHIFT[i++ & 3];
            }

            this.lastByteIndex = i;
            this.bytes += i - this.start;
            if (i >= 64) {
                this.block = blocks[16];
                this.start = i - 64;
                this.hash();
                this.hashed = true;
            } else {
                this.start = i;
            }
        }
        if (this.bytes > 4294967295) {
            this.hBytes += (this.bytes / 4294967296) << 0;
            this.bytes = this.bytes % 4294967296;
        }
        return this;
    };

    Sha1.prototype.finalize = function () {
        if (this.finalized) {
            return;
        }
        this.finalized = true;
        var blocks = this.blocks,
            i = this.lastByteIndex;
        blocks[16] = this.block;
        blocks[i >> 2] |= EXTRA[i & 3];
        this.block = blocks[16];
        if (i >= 56) {
            if (!this.hashed) {
                this.hash();
            }
            blocks[0] = this.block;
            blocks[16] =
                blocks[1] =
                blocks[2] =
                blocks[3] =
                blocks[4] =
                blocks[5] =
                blocks[6] =
                blocks[7] =
                blocks[8] =
                blocks[9] =
                blocks[10] =
                blocks[11] =
                blocks[12] =
                blocks[13] =
                blocks[14] =
                blocks[15] =
                    0;
        }
        blocks[14] = (this.hBytes << 3) | (this.bytes >>> 29);
        blocks[15] = this.bytes << 3;
        this.hash();
    };

    Sha1.prototype.hash = function () {
        var a = this.h0,
            b = this.h1,
            c = this.h2,
            d = this.h3,
            e = this.h4;
        var f,
            j,
            t,
            blocks = this.blocks;

        for (j = 16; j < 80; ++j) {
            t = blocks[j - 3] ^ blocks[j - 8] ^ blocks[j - 14] ^ blocks[j - 16];
            blocks[j] = (t << 1) | (t >>> 31);
        }

        for (j = 0; j < 20; j += 5) {
            f = (b & c) | (~b & d);
            t = (a << 5) | (a >>> 27);
            e = (t + f + e + 1518500249 + blocks[j]) << 0;
            b = (b << 30) | (b >>> 2);

            f = (a & b) | (~a & c);
            t = (e << 5) | (e >>> 27);
            d = (t + f + d + 1518500249 + blocks[j + 1]) << 0;
            a = (a << 30) | (a >>> 2);

            f = (e & a) | (~e & b);
            t = (d << 5) | (d >>> 27);
            c = (t + f + c + 1518500249 + blocks[j + 2]) << 0;
            e = (e << 30) | (e >>> 2);

            f = (d & e) | (~d & a);
            t = (c << 5) | (c >>> 27);
            b = (t + f + b + 1518500249 + blocks[j + 3]) << 0;
            d = (d << 30) | (d >>> 2);

            f = (c & d) | (~c & e);
            t = (b << 5) | (b >>> 27);
            a = (t + f + a + 1518500249 + blocks[j + 4]) << 0;
            c = (c << 30) | (c >>> 2);
        }

        for (; j < 40; j += 5) {
            f = b ^ c ^ d;
            t = (a << 5) | (a >>> 27);
            e = (t + f + e + 1859775393 + blocks[j]) << 0;
            b = (b << 30) | (b >>> 2);

            f = a ^ b ^ c;
            t = (e << 5) | (e >>> 27);
            d = (t + f + d + 1859775393 + blocks[j + 1]) << 0;
            a = (a << 30) | (a >>> 2);

            f = e ^ a ^ b;
            t = (d << 5) | (d >>> 27);
            c = (t + f + c + 1859775393 + blocks[j + 2]) << 0;
            e = (e << 30) | (e >>> 2);

            f = d ^ e ^ a;
            t = (c << 5) | (c >>> 27);
            b = (t + f + b + 1859775393 + blocks[j + 3]) << 0;
            d = (d << 30) | (d >>> 2);

            f = c ^ d ^ e;
            t = (b << 5) | (b >>> 27);
            a = (t + f + a + 1859775393 + blocks[j + 4]) << 0;
            c = (c << 30) | (c >>> 2);
        }

        for (; j < 60; j += 5) {
            f = (b & c) | (b & d) | (c & d);
            t = (a << 5) | (a >>> 27);
            e = (t + f + e - 1894007588 + blocks[j]) << 0;
            b = (b << 30) | (b >>> 2);

            f = (a & b) | (a & c) | (b & c);
            t = (e << 5) | (e >>> 27);
            d = (t + f + d - 1894007588 + blocks[j + 1]) << 0;
            a = (a << 30) | (a >>> 2);

            f = (e & a) | (e & b) | (a & b);
            t = (d << 5) | (d >>> 27);
            c = (t + f + c - 1894007588 + blocks[j + 2]) << 0;
            e = (e << 30) | (e >>> 2);

            f = (d & e) | (d & a) | (e & a);
            t = (c << 5) | (c >>> 27);
            b = (t + f + b - 1894007588 + blocks[j + 3]) << 0;
            d = (d << 30) | (d >>> 2);

            f = (c & d) | (c & e) | (d & e);
            t = (b << 5) | (b >>> 27);
            a = (t + f + a - 1894007588 + blocks[j + 4]) << 0;
            c = (c << 30) | (c >>> 2);
        }

        for (; j < 80; j += 5) {
            f = b ^ c ^ d;
            t = (a << 5) | (a >>> 27);
            e = (t + f + e - 899497514 + blocks[j]) << 0;
            b = (b << 30) | (b >>> 2);

            f = a ^ b ^ c;
            t = (e << 5) | (e >>> 27);
            d = (t + f + d - 899497514 + blocks[j + 1]) << 0;
            a = (a << 30) | (a >>> 2);

            f = e ^ a ^ b;
            t = (d << 5) | (d >>> 27);
            c = (t + f + c - 899497514 + blocks[j + 2]) << 0;
            e = (e << 30) | (e >>> 2);

            f = d ^ e ^ a;
            t = (c << 5) | (c >>> 27);
            b = (t + f + b - 899497514 + blocks[j + 3]) << 0;
            d = (d << 30) | (d >>> 2);

            f = c ^ d ^ e;
            t = (b << 5) | (b >>> 27);
            a = (t + f + a - 899497514 + blocks[j + 4]) << 0;
            c = (c << 30) | (c >>> 2);
        }

        this.h0 = (this.h0 + a) << 0;
        this.h1 = (this.h1 + b) << 0;
        this.h2 = (this.h2 + c) << 0;
        this.h3 = (this.h3 + d) << 0;
        this.h4 = (this.h4 + e) << 0;
    };

    Sha1.prototype.digest = function () {
        this.finalize();

        var h0 = this.h0,
            h1 = this.h1,
            h2 = this.h2,
            h3 = this.h3,
            h4 = this.h4;

        return [
            (h0 >> 24) & 0xff,
            (h0 >> 16) & 0xff,
            (h0 >> 8) & 0xff,
            h0 & 0xff,
            (h1 >> 24) & 0xff,
            (h1 >> 16) & 0xff,
            (h1 >> 8) & 0xff,
            h1 & 0xff,
            (h2 >> 24) & 0xff,
            (h2 >> 16) & 0xff,
            (h2 >> 8) & 0xff,
            h2 & 0xff,
            (h3 >> 24) & 0xff,
            (h3 >> 16) & 0xff,
            (h3 >> 8) & 0xff,
            h3 & 0xff,
            (h4 >> 24) & 0xff,
            (h4 >> 16) & 0xff,
            (h4 >> 8) & 0xff,
            h4 & 0xff,
        ];
    };

    window.sha1 = function (buf) {
        return new Sha1(true).update(buf).digest();
    };
})();
(function() {
    /**
     * https://github.com/Cazka/fast-pow/blob/main/src/pow_worker_int.js
     */
    function solve(prefix, difficulty) {
        const buf = new Uint8Array(48).fill(48);
        prefix = new TextEncoder().encode(prefix);

        buf.set(prefix, 0);
        buf.set(prefix, 32);

        const zeroes = difficulty - (difficulty % 4);
        const mask1 = (2 ** zeroes - 1) << (32 - zeroes);
        const mask2 = (2 ** (difficulty - zeroes) - 1) << (zeroes - 4);
        const mask3 = mask1 | mask2;

        while (true) {
            if (solvesDifficulty(sha1(buf), mask2, mask3)) break;
            increment(buf);
        }
        return new TextDecoder().decode(buf.subarray(16, 32));
    }
    function increment(buf) {
        let i = 31;

        buf[i] += 1;
        while (i > 15 && buf[i] === 58) {
            buf[i] = 48;
            buf[--i] += 1;
        }
    }
    function solvesDifficulty(hash, mask2, mask3) {
        let z = (hash[0] << 24) + (hash[1] << 16) + (hash[2] << 8) + hash[3];

        if ((z & mask3) !== mask2) return false;

        return true;
    }

    function createCallback(id) {
        return function() {
            postMessage([id].concat(Array.prototype.slice.apply(arguments)));
        }
    }
    onmessage = function(e) {
        var data = e.data;
        var id = data[0];
        var func = data[1];
        var cb = createCallback(id);
        if (func == "solve") {
            cb(solve(data[2], data[3]));
        }
    }
}
)();
`;
class PowWorker {
    constructor() {
        this.worker = new Worker(URL.createObjectURL(new Blob([WORKER], {type: 'application/javascript'})));
        this.nextJobId = 0;
        this.workerCallbacks = {};
        this.worker.onmessage = (e) => this._onmessage(e);
        this.startTime;
        this.times = [];
    }
    _onmessage(e) {
        const duration = Date.now() - this.startTime;
        this.times.push(duration);
        //console.log(`[${this.times.length}]: ${duration}, AVG:${this.times.reduce((acc, x) => acc + x) / this.times.length}`);
        const data = e.data;
        const id = data[0];
        this.workerCallbacks[id](data[1]);
    }
    solve(prefix, difficulty, cb) {
        this.startTime = Date.now();
        if(difficulty < 19) {
            const startTime = Date.now();
            cb = new Proxy(cb, {
                apply(target, thisArg, args) {
                    setTimeout(() => Reflect.apply(target, thisArg, args), 10000 - (Date.now() - startTime));
                }
            });
        }
        const id = this.nextJobId++;
        this.worker.postMessage([id, 'solve', prefix, difficulty]);
        this.workerCallbacks[id] = cb;
    }
}

const worker = new PowWorker();
window.m28.pow.solve = worker.solve.bind(worker);
