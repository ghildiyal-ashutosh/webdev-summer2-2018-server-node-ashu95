module.exports = app => {

    const sectionModel = require('../models/sections/section.model.server')
    const enrollmentModel = require('../models/enrollment/enrollment.model.server')

    createSection = (req, res) => {
        sectionModel
            .createSection(req.body)
            .then(section => res.send(section));

    }

    findSectionForCourse = (req, res) => {
        const courseId = req.params['courseId']
        sectionModel
            .findSectionForCourse(courseId)
            .then(sections => res.send(sections));

    }


    findAllSections = (req, res) => {
        sectionModel
            .findAllSections()
            .then(sections => res.send(sections));
    }


    enrollSection = (req, res) => {
        var sectionId1 = req.params['sectionId'];
        var enrollment1 = {
            student: req.session.currentUser._id,
            section: sectionId1
        };

        sectionModel
            .decreaseSectionSeats(sectionId)
            .then(function () {
                return enrollmentModel
                    .enrollStudentSection(enrollment1)
            }).then(function (enrollment) {
            res.json(enrollment);

        });
    }


    unenrollSection = (req, res) => {
        const sectionId = req.params['sectionId']
        const enrollment2 = {
            student: req.session.currentUser._id,
            section: sectionId
        }
        sectionModel
            .increaseSectionSeats(sectionId)
            .then(function () {
                return enrollmentModel
                    .enrollStudentSection(enrollment2)
            }).then(function (enrollment) {
            res.json(enrollment);

        })
    }

    deleteSection = (req, res) => {
        const enrollment = {
            section: req.params.sectionId
        };

        sectionModel
            .deleteSection(req.params.sectionId)
            .then(function () {
                enrollmentModel.deleteEnrollmentSection(enrollment)
            }).then(function (sections) {
            res.json(sections);
        })
    }

    findSectionById = (req, res) => {
        sectionModel
            .findSectionById(req.params.sectionId)
            .then(section => res.json(section))
    }

    findSectionForStudent = (req, res) => {
        enrollmentModel
            .findSectionsForStudent(req.session['currentUser']._id)
            .then(enrollments => res.json(enrollments))
    }

    updateSection = (req, res) => {
        sectionModel
            .updateSection(req.body)
            .then(section => res.json(section))
    }


    app.post('/api/course/:courseId/section', createSection);
    app.get('/api/section/:sectionId', findSectionById);
    app.delete('/api/section/:sectionId', deleteSection);
    app.put('/api/section/:sectionId', updateSection);

    app.get('/api/course/:courseId/section', findSectionForCourse );
    app.get('/api/findAllSections', findAllSections);
    app.put('/api/section/enroll/:sectionId', enrollSection);
    app.delete('/api/section/unenroll/:sectionId', unenrollSection);
    app.get('/api/student/section', findSectionForStudent);
};