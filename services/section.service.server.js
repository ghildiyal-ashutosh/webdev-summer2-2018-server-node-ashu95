module.exports = app => {

    const sectionModel = require('../models/sections/section.model.server')

    createSection = (req,res) => {
        sectionModel
             .createSection(req.body)
             .then(section => res.send(section));

    }

    findSectionForCourse = (req,res) => {
           var courseId = req.params['courseId']
        sectionModel
            .findSectionForCourse(courseId)
            .then(sections => res.send(sections));

    }
    app.post('/api/section', createSection);
    app.get('/api/course/:courseId/section', findSectionForCourse );
}