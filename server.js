var express = require('express');
var app = express();
var session = require('express-session');
var bodyParser = require('body-parser');


const mongoose = require('mongoose');

mongoose.connect('mongodb://heroku_9kz4wcwb:mg5iq7qrj3igaff8vpgo7eolr3@ds119052.mlab.com:19052/heroku_9kz4wcwb')


// cross origin call (CORS)
app.use(function (req,res,next) {
    res.header("Access-Control-Allow-Origin" , 'https://webdev2-angular-ashu95.herokuapp.com');
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
    secret: 'any string',
    cookie: {

        maxAge: 30 * 60 * 1000
    },
    rolling: true
}
));



require('./services/user.service.server')(app);
require('./services/section.service.server')(app);


app.listen(process.env.PORT || 3000)
