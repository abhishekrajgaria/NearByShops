const express = require('express');
const bodyParser = require('body-parser');
const router = require('./routes/admin');

const app = express();

app.use(bodyParser.json());

app.use(router);


app.listen(8000);