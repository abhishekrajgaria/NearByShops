const express = require('express');
const bodyParser = require('body-parser');

const router = require('./routes/admin');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(router);


app.listen(3000);