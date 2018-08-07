var express = require('express')
var app = express()
var session = require('express-session')


// cross origin call (CORS)
app.use(function (req,res,next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin,X-Requested-With,Content-Type,Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
});



app.use(session({
    resave: false,
    saveUninitialized : true,
    secret: 'any string'
}));





  function setSession(req,res){

    var name = req.params['name'];
    var value = req.params['value'];

    req.session[name] =value;
    res.send(req.session);


}

function getSession(req,res)  {

    var name = req.params['name'];
    var value = req.session[name];
    res.send(value);
    
}

function logIn(req,res)
{
    res.send("success");
}


app.post('/login', logIn);
app.get('/api/session/set/:name/:value', setSession);
app.get('/api/session/get/:name', getSession);

const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1/webdev2_summer2018')

var userSchema = mongoose.Schema ({
    username: String,
    firstName: String,
    lastName : String,
    password: String
}, {collection:'user'});

var userModel = mongoose.model('UserModel', userSchema);

app.get ('/user', findAllUsers)

function findAllUsers(req,res) {

    userModel.find()
        .then(function (users) {
            console.log(users);
            res.send(users);

        })
}

app.listen(3000)

