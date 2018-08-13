const mongoose = require('mongoose');

const questionSchema = require ('./question.schema.server');

const questionModel = mongoose.model('QuestionModel', questionSchema);

createQuestion = question =>
    questionModel.create(question);

findAllQuestions = () =>
    questionModel.find();

findQuestionById = (questionId) =>
    questionModel.findOne({_id: questionId});

deleteQuestion = (questionId) =>
    questionModel.deleteOne({_id: questionId});

module.exports = {
    createQuestion,findAllQuestions, findQuestionById, deleteQuestion
};