const mongoose = require('mongoose');

module.exports = mongoose.Schema ({
    title: String,
    points: Number,
    description: String,
    questionText: String,
    true: Boolean,
    essayLength: Number,
    score:Number,
    blanks : [],
    choices : [{
        text: String,
        value: String,
        correct: Boolean
    }],
    questionType: {type: String,
                   enum: ['ESSAY','FILL_BLANKS','TRUE_FALSE', 'MULTIPLE_CHOICE']}
}, {collection: 'question'});