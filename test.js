const { Worker } = require('worker_threads');
const pow_worker = new Worker(__dirname + '/src/pow_worker_int.js');

pow_worker.on('message', ({ result, id }) => {
    console.timeEnd('pow');
    console.log(result);
    pow_worker.terminate();
});

function solve(prefix, difficulty) {
    pow_worker.postMessage({ prefix, difficulty, id: 0 });
}
console.time('pow');
solve('aaaaaaaaaaaaaaaa', 19);