const mongoose = require('mongoose')
module.exports = mongoose.Schema({
    title: String,
    questions: [{
        type:mongoose.Schema.Types.ObjectId,
        ref:'QuestionModel'
    }]

}, {collection:'quiz'})