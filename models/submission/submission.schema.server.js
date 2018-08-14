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
        fillBlankAnswers: {
            variable: String,
            value:String
        },
        multipleChoiceAnswer: Number,
        trueFalseAnswer: Boolean,
        question: {
            type: mongoose.Schema.Types.ObjectId, ref:'QuestionModel'
        }
    }],
    score: Number,
    total: Number
},{collection: 'submission'});
