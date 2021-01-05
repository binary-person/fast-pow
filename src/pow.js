(function () {
    async function solve(prefix, difficulty, cb) {
        const secret = localStorage['pow_secret'];
        const res = await fetch(`https://fast-pow.herokuapp.com/solve?prefix=${prefix}&difficulty=${difficulty}&secret=${secret}`);
        const str = await res.text();
        cb(str);
    }

    window.m28 = window.m28 || {};
    window.m28.pow = {
        solve: solve,
    };
})();
