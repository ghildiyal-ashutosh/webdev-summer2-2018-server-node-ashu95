const mongoose = require('mongoose')
module.exports = mongoose.Schema ({
    title: String,
    courseId : String
},{collection:'section'});