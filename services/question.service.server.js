module.exports = app => {
    const questionModel = require('../models/question/question.model.server')

    createQuestion = (req,res) =>
        questionModel.createQuestion(req.body)
                       .then(
                           question => res.json(question),
                           error =>  res.send(error)) ;

         findAllQuestions = (req,res) =>
             questionModel.findAllQuestions()
                          .then(
                              questions => res.send(questions),
                              error => res.send(error)
                          )

    findQuestionById = (req,res) =>
        questionModel.findQuestionById(req.params.questionId)
                     .then(
                         question => res.json(question),
                         error => res.send(error)
                     )

    deleteOuestion = (req,res) =>
        questionModel.deleteQuestion(req.params.questionId)
            .then((response) => res.send(response));

         app.post('/api/question', createQuestion);
         app.get('/api/question/:questionId', findQuestionById);
         app.get('/api/question', findAllQuestions);
         app.delete('/api/question/:questionId', deleteOuestion);


}