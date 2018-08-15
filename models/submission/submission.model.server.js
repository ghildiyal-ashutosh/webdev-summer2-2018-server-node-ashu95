const mongoose = require('mongoose');

const submissionSchema = require('./submission.schema.server');

const subModel = mongoose.model('SubmissionModel', submissionSchema);

createSubmission = submission =>
    subModel.create(submission);

findAllSubmissions = () =>
   subModel.find()
       .populate('student')
       .populate('quiz')
       .populate('answers.question')
       .exec()

findAllSubmissionsForStudentForQuiz = (studentId,quizId) =>
    subModel.find({student:studentId, quiz: quizId})
         .populate('student')
         .populate('quiz')
         .populate('answers.question')
         .exec()

findAllSubmissionsForStudent = studentId =>
    subModel.find({student:studentId})
        .populate('student')
        .populate('quiz')
        .populate('answers.question')
        .exec()




findAllSubmissionsForQuiz = quizId =>
    subModel.find({quiz:quizId})
        .populate('student')
        .populate('quiz')
        .populate('answers.question')
        .exec()

findSubmissionById = (submissionId,quizId,studentId) =>
    subModel.findOne({student:studentId, quiz: quizId, _id: submissionId})
        .populate('student')
        .populate('quiz')
        .populate('answers.question')
        .exec()

module.exports = {
    createSubmission,findAllSubmissions,findAllSubmissionsForQuiz,findSubmissionById,
    findAllSubmissionsForStudentForQuiz,findAllSubmissionsForStudent
};