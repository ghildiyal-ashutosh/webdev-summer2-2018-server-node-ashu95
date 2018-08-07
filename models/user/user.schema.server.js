const mongoose = require('mongoose');


module.exports = mongoose.Schema ({
    username: String,
    firstName: String,
    lastName : String,
    password: String
}, {collection:'user'});