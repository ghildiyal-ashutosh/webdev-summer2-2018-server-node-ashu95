module.exports = app => {

    const quizModel = require ('../models/quiz/quiz.model.server');

    createQuiz = (req,res) => {
        quizModel.createQuiz(req.body)
            .then((quiz) => res.send(quiz));

    }

    findAllQuizzes = (req,res) => {
        quizModel.findAllQuizzes()
            .then((quizzes) => res.send(quizzes));

    }

    findQuizById = (req,res) => {
        quizModel.findQuizById(req.params.quizId)
            .then (quiz => res.send(quiz));
    }

    updateQuiz = (req,res) => {
        quizModel.updateQuiz(req.params.quizId, req.body);
        res.send('updateQuiz');
    }

    deleteQuiz = (req,res) => {
        quizModel.deleteQuiz(req.params.quizId)
            .then((response) => res.send(response));
        }

    addQuestion = (req,res) => {
        quizModel.addQuestion(req.params.quizId, req.params.questionId)
            .then(
                status => res.send(status),
                error => res.send(error)
            )
    }

    deleteQuestion = (req,res) => {
        quizModel.deleteQuestion(req.params.quizId, req.params.questionId)
            .then(
                status => res.send(status),
                error => res.send(error)
            )
    }



    app.post('/api/quiz', createQuiz);
    app.get('/api/quiz', findAllQuizzes);
    app.get('/api/quiz/:quizId', findQuizById);
    app.delete('/api/quiz/:quizId', deleteQuiz);
    app.put('api/quiz/:quizId', updateQuiz);
    app.put('/api/quiz/:quizId/question/:questionId', addQuestion);
    app.delete('/api/quiz/:quizId/question/:questionId', deleteQuestion);


}