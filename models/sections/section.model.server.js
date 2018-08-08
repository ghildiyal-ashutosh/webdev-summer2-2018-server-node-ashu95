const mongoose = require('mongoose');

const sectionSchema = require ('./section.schema.server');

const sectionModel = mongoose.model('SectionModel', sectionSchema);

createSection = section =>
    sectionModel.create(section);



findSectionForCourse  = (courseId) =>
    sectionModel.find({courseId:courseId})


module.exports = {
    createSection,
    findSectionForCourse
};
