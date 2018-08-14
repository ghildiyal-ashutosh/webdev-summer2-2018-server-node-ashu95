module.exports = app => {

    const subModel = require('../models/submission/submission.model.server');

function createSubmission(req,res) {




    var value = calculateGrade(req.body);

    var grade = value[0];
    var total = value[1];
    var questions = value[2];
    var answers = value[3];



    var studentId = req.session.currentUser._id;
    var quizId = req.body._id;



    console.log(answers);




    const submission = {student:studentId, quiz: quizId, score: grade, total: total,answers:answers};

    subModel.createSubmission(submission)
        .then(() => {
            res.send(submission);
        });

}



 //   findAllSubmissionsForStudentForQuiz =  () =>





    app.post('/api/quiz/:quizId/submission', createSubmission);
 //   app.get('/api/quiz/:quizId/submission', findAllSubmissionsForStudentForQuiz );
 //   app.get('/api/quiz/:quizId/submission/:submissionId' , findSubmissionById);

 //   app.get('/api/quiz/:quizId', findAllSubmissionsForQuiz);
 //   app.get('/api/submission' ,findAllSubmissions);

 //   app.get('/api/submission/student', findAllSubmissionsForStudent);




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
                    if (question.essayAnswer.length === question.essayLength ) {
                        grade += question.points;
                        question.score = question.points;

                    }
                    ans = {essayAnswer: question.essayAnswer, question: question._id};


                    break;

                case 'FILL_BLANKS':

                    var val = question.blanks.length/2;
                    for(let j =1; j<question.blanks.length;j=j+2)
                    {
                        var given = question.fillBlankAnswers[question.blanks[j].split(' ')[0].replace('*', '')];
                        var ans1 = question.blanks[j].split(' ')[2];

                        if( given=== ans1 )
                        {
                            grade = grade + (question.points)/val;
                            question.score += (question.points)/val;

                        }

                    }

                     ans = {fillBlankAnswers:question.fillBlankAnswers, question: question._id}


                    break;

                case 'MULTIPLE_CHOICE':
                    let ans2;
                    for (let k =0; k<question.choices.length;k++)
                    {
                        if (question.choices[k].correct)
                        {
                            ans2 = k;
                        }
                    }

                    if (ans2 === question.multipleChoiceAnswer) {
                        grade = grade + question.points;
                        question.score = question.points;
                    }
                    ans = {multipleChoiceAnswer:question.multipleChoiceAnswer, question:question._id}
                    break;

                case 'TRUE_FALSE':
                    if(question.true === question.trueFalseAnswer) {
                        grade += question.points;
                        question.score = question.points;
                    }

                    ans = {trueFalseAnswer: question.trueFalseAnswer, question: question._id}

                    break;
                default:
                    break;

            }

            answers.push(ans);


        }

        return [grade,total,questions,answers];

    }



}