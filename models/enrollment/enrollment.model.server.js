const mongoose = require('mongoose');

const enrollmentSchema = require('./enrollment.schema.server');

var enrollmentModel = mongoose.model("EnrollmentModel", enrollmentSchema)
