const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());


app.get('/', (req, res) => {
    res.sendStatus(200);
})

app.listen(process.env.PORT || 3000, () => console.log('listening on port', process.env.PORT || 3000));