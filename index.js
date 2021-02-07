const express = require('express');
const { Worker } = require('worker_threads');
const cors = require('cors');
const app = express();

const pow_worker = new Worker(__dirname + '/src/pow_worker_int.js');
let nextJobId = 0;
const workerCallbacks = {};

pow_worker.on('message', ({ result, id }) => {
    workerCallbacks[id](result);
});

app.use(cors());

app.get('/', (req, res) => {
    res.sendStatus(200);
});

app.get('/pow.js', (req, res) => {
    res.sendFile(__dirname + '/src/pow.js');
});

app.get('/solve', (req, res) => {
    const { prefix, difficulty, secret } = req.query;

    if (secret !== process.env.secret) {
        res.sendStatus(401);
        return;
    }
    if (difficulty > 20) {
        res.sendStatus(418);
        return;
    }

    const id = nextJobId++;
    workerCallbacks[id] = (result) => res.send(result);
    pow_worker.postMessage({ prefix, difficulty, id });
});

app.listen(process.env.PORT || 3000, () => console.log('listening on port', process.env.PORT || 3000));
