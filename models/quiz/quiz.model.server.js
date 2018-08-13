const mongoose = require('mongoose');

const quizSchema = require('./quiz.schema.server');
const quizModel = mongoose.model('QuizModel', quizSchema);

createQuiz = quiz =>
    quizModel.create(quiz);

findAllQuizzes = () =>
    quizModel.find();

findQuizById = quizId =>
    quizModel.findOne({_id: quizId})
        .populate('questions')
        .exec()

updateQuiz = (quizId, newQuiz) =>
    quizModel.update({_id:quizId},
        {
            title: newQuiz.title
        });
deleteQuiz = quizId =>
    quizModel.remove({_id:quizId})

addQuestion = (quizId, questionId) =>
    quizModel.update({_id: quizId}, {
        $push : {questions: questionId}
    })

module.exports = {
    createQuiz,findAllQuizzes,findQuizById,
    updateQuiz,deleteQuiz,addQuestion
};
