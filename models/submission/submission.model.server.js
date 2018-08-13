const mongoose = require('mongoose');

const submissionSchema = require('./submission.schema.server');

const subModel = mongoose.model('SubmissionModel', submissionSchema);

createSubmission = submission =>
    subModel.create(submission);

findAllSubmissions = () =>
   subModel.find();

findAllSubmissionsForStudentForQuiz = (studentId,quizId) =>
    subModel.find({student:studentId, quiz: quizId});

findAllSubmissionsForStudent = studentId =>
    subModel.find({student:studentId});


findAllSubmissionsForQuiz = quizId =>
    subModel.find({quiz:quizId});

findSubmissionById = (submissionId,quizId,studentId) =>
    subModel.findOne({student:studentId, quiz: quizId, _id: submissionId});

module.exports = {
    createSubmission,findAllSubmissions,findAllSubmissionsForQuiz,findSubmissionById,
    findAllSubmissionsForStudentForQuiz,findAllSubmissionsForStudent
};