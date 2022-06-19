const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const adminRoutes = require('./routes/admin')
const resultRoutes = require('./routes/result')

app.use(bodyParser.urlencoded({extended: false}));

app.use(adminRoutes)
app.use(resultRoutes)


app.listen(8080);
