const mongoose = require('mongoose');


module.exports = mongoose.Schema ({
    section : {
        type: mongoose.Schema.Types.ObjectId, ref: 'SectionModel'
    },

    student : {
        type :  mongoose.Schema.Types.ObjectId, ref : 'UserModel'
    },

    scores : Number

    }, {collection:'enrollment'});