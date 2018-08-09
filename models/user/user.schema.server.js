const mongoose = require('mongoose');


module.exports = mongoose.Schema ({
    username: String,
    firstName: String,
    lastName : String,
    password: String,
    email : String,
    contact: Number,
    sections :
        [{type : mongoose.Schema.Types.ObjectId,
            ref : 'SectionModel'}]
}, {collection:'user'});