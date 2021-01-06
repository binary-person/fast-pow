(function () {
    async function solve(prefix, difficulty, cb) {
        const start = Date.now();
        const secret = localStorage['pow_secret'];
        const res = await fetch(`https://fast-pow.herokuapp.com/solve?prefix=${prefix}&difficulty=${difficulty}&secret=${secret}`);
        const str = await res.text();
        setTimeout(() => cb(str), 9000 - (Date.now() - start));
    }

    window.m28 = window.m28 || {};
    window.m28.pow = {
        solve: solve,
    };
})();
