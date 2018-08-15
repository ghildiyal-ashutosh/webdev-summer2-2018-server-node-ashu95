module.exports = app => {

    const subModel = require('../models/submission/submission.model.server');

function createSubmission(req,res) {

    var value = calculateGrade(req.body);

    var grade = value[0];
    var total = value[1];
    var questions = value[2];
    var answers = value[3];

    var timeStamp = Date.now();

    var studentId = req.session.currentUser._id;
    var quizId = req.body._id;

    const submission = {student:studentId, quiz: quizId, score: grade, total: total,answers:answers, timeStamp: timeStamp};

    subModel.createSubmission(submission)
        .then(() => {
            res.send(submission);
        });

}

function findAllSubmissionsForStudentForQuiz(req,res){

    var studentId = req.session.currentUser._id;
    var quizId = req.params.quizId;

    subModel.findAllSubmissionsForStudentForQuiz(studentId,quizId)
        .then((submissions) => res.send(submissions) );
    }

   function findSubmissionById(req,res){

    var quizId = req.params.quizId;
    var submissionId = req.params.submissionId;
    var studentId = req.session.currentUser._id;

    subModel.findSubmissionById(submissionId,quizId,studentId)
        .then((submission) => res.send(submission));
   }

   function findAllSubmissionsForQuiz (req,res){

    var quizId = req.params.quizId;

    subModel.findAllSubmissionsForQuiz(quizId)
        .then((submission) => res.send(submission));

   }

   function findAllSubmissions (req,res){
    subModel.findAllSubmissions()
        .then((submission) => res.send(submission));
   }

   function findAllSubmissionsForStudent(req,res){

    var studentId = req.session.currentUser._id;

    subModel.findAllSubmissionsForStudent(studentId)
        .then((submission) => res.send(submission));
   }



 //   findAllSubmissionsForStudentForQuiz =  () =>





    app.post('/api/quiz/:quizId/submission', createSubmission);
    app.get('/api/quiz/:quizId/submission', findAllSubmissionsForStudentForQuiz );
    app.get('/api/quiz/:quizId/submission/:submissionId' , findSubmissionById);

    app.get('/api/quiz/:quizId/quizSubmissions', findAllSubmissionsForQuiz);
    app.get('/api/submission' ,findAllSubmissions);

    app.get('/api/submission/student', findAllSubmissionsForStudent);




    function calculateGrade (body)
    {
      var  questions = body.questions;

        var length = questions.length;

        var grade = 0;

        var total = 0;
        var answers =[];


        for (let i =0; i<length; i++ )
        {
            var question = questions[i];
            total+= question.points;
            let ans = {};

            switch(question.questionType)
            {
                case 'ESSAY':
                    var s1 = 0;
                    if (question.essayAnswer.length >= question.essayLength ) {
                        grade += question.points;
                        s1 = question.points;

                    }
                    question.score = s1;
                    console.log(question.score);
                    ans = {essayAnswer: question.essayAnswer, question: question._id, scored: question.score};


                    break;

                case 'FILL_BLANKS':

                    var val = question.blanks.length/2;
                    var s = 0;
                    for(let j =1; j<question.blanks.length;j=j+2)
                    {
                        var given = question.fillBlankAnswers[question.blanks[j].split(' ')[0].replace('*', '')];
                        var ans1 = parseInt(question.blanks[j].split(' ')[2]);

                        if( given === ans1 )
                        {
                            grade = grade + (question.points)/val;
                            s += (question.points)/val;



                        }
                        }
                    question.score = s;


                     ans = {fillBlankAnswers:question.fillBlankAnswers, question: question._id, scored: question.score}


                    break;

                case 'MULTIPLE_CHOICE':
                    let ans2;
                    var s2 = 0;
                    for (let k =0; k<question.choices.length;k++)
                    {
                        if (question.choices[k].correct)
                        {
                            ans2 = k;
                        }
                    }

                    if (ans2 === question.multipleChoiceAnswer) {
                        grade = grade + question.points;
                        s2 = question.points;
                    }
                    question.score = s2;
                    console.log(question.score + 'MC');
                    ans = {multipleChoiceAnswer:question.multipleChoiceAnswer, question:question._id, scored: question.score}
                    break;

                case 'TRUE_FALSE':
                    var s3 = 0;
                    if(question.true === question.trueFalseAnswer) {
                        grade += question.points;
                        s3 = question.points;
                    }
                        question.score = s3;
                    console.log(question.score + 'TF')
                    ans = {trueFalseAnswer: question.trueFalseAnswer, question: question._id, scored: question.score}

                    break;
                default:
                    break;

            }

            answers.push(ans);


        }

        return [grade,total,questions,answers];

    }



}