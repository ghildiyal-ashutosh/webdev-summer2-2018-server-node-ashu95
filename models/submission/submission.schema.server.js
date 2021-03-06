const mongoose = require('mongoose');


module.exports = mongoose.Schema ({


    student: {
        type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'
    },
    quiz: {
        type: mongoose.Schema.Types.ObjectId, ref: 'QuizModel'
    },
    answers: [{
        essayAnswer: String,
        fillBlankAnswers: Object,
        multipleChoiceAnswer: Number,
        trueFalseAnswer: Boolean,
        question: {
            type: mongoose.Schema.Types.ObjectId, ref:'QuestionModel'
        },
        scored:Number
    }],
    score: Number,
    total: Number,
    timeStamp: Number
},{collection: 'submission'});
