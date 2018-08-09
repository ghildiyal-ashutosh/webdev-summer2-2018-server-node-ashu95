const mongoose = require('mongoose');

const enrollmentSchema = require('./enrollment.schema.server');

const enrollmentModel = mongoose.model("EnrollmentModel", enrollmentSchema)


findSectionsForStudent = (studentId) =>
    enrollmentModel
         .find({student : studentId})
         .populate ('section')
         .exec();

enrollStudentSection = (enrollment) =>
    enrollmentModel.create(enrollment);

unenrollStudentSection = (enrollment) =>
    enrollmentModel.deleteOne(enrollment);

deleteEnrollmentSection = (enrollment) =>
    enrollmentModel.remove(enrollment);


module.exports = {
    findSectionsForStudent,
    enrollStudentSection,
    unenrollStudentSection,
    deleteEnrollmentSection

};