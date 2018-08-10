var express = require('express');
var app = express();
var session = require('express-session');
var bodyParser = require('body-parser');


// cross origin call (CORS)
app.use(function (req,res,next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:4200");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Headers", "Origin,X-Requested-With,Content-Type,Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
});

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use(session({
    resave: false,
    saveUninitialized : true,
    secret: 'any string'
}));

const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1/webdev2_summer2018');

require('./services/user.service.server')(app);
require('./services/section.service.server')(app);


app.listen(process.env.PORT || 3000)
