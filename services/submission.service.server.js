module.exports = app => {

createSubmission = (req,res) =>
    res.send(req.body);

 //   findAllSubmissionsForStudentForQuiz =  () =>





    app.post('/api/quiz/:quizId/submission', createSubmission);
 //   app.get('/api/quiz/:quizId/submission', findAllSubmissionsForStudentForQuiz );
 //   app.get('/api/quiz/:quizId/submission/:submissionId' , findSubmissionById);

 //   app.get('/api/quiz/:quizId', findAllSubmissionsForQuiz);
 //   app.get('/api/submission' ,findAllSubmissions);

 //   app.get('/api/submission/student', findAllSubmissionsForStudent);



}