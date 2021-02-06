const { Worker } = require('worker_threads');
const pow_worker = new Worker(__dirname + '/src/pow_worker.js');

pow_worker.on('message', ({ result, id }) => {
    console.log(result);
    pow_worker.terminate();
});

function solve(prefix, difficulty) {
    pow_worker.postMessage({ prefix, difficulty, id: 0 });
}
