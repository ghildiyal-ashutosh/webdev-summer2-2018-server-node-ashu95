const mongoose = require('mongoose')
module.exports = mongoose.Schema ({
    title: String,
    courseId : String,
    maxSeats: Number,
    remSeats:Number,
    students: [String]
},{collection:'section'});