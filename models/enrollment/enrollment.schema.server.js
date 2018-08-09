const mongoose = require('mongoose');


module.exports = mongoose.Schema ({
    sections : {
        type: mongoose.Schema.Types.ObjectId, ref: 'SectionModel'
    },

    student : {
        type :  mongoose.Schema.Types.ObjectId, ref : 'UserModel'
    },

    score : Number

}, {collection:'enrollment'});