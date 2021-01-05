(function () {
    async function solve(prefix, difficulty, cb) {
        const res = await fetch(`https://fast-pow.herokuapp.com/solve?prefix=${prefix}&difficulty=${difficulty}`);
        const str = await res.text();
        cb(str);
    }

    window.m28 = window.m28 || {};
    window.m28.pow = {
        solve: solve,
    };
})();
