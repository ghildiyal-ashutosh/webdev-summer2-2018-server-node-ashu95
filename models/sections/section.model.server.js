const mongoose = require('mongoose');

const sectionSchema = require ('./section.schema.server');

const sectionModel = mongoose.model('SectionModel', sectionSchema);

const userModel = require('../user/user.model.server');

createSection = section =>
    sectionModel.create(section);

findSectionForCourse  = (courseId) =>
    sectionModel.find({courseId:courseId})

findAllSections = () =>
    sectionModel.find();


findSectionById = (sectionId) =>
    sectionModel.find({_id : sectionId });

decreaseSectionSeats = (sectionId) =>
    sectionModel.update ({
        _id: sectionId
    }, {
        $inc: {remSeats: -1}
    });

increaseSectionSeats = (sectionId) =>
    sectionModel.update({
        _id: sectionId
        }, {
        $inc: {remSeats : +1}
    });

updateSection = (section) =>
    sectionModel.update({
        _id: section.sectionId
    },{
        title: section.title,
        maxSeats : section.maxSeats,
        remSeats : section.remSeats,


    });

 deleteSection = (sectionId) =>
   sectionModel.deleteOne({_id: sectionId})







module.exports = {
    createSection,
    findSectionForCourse,
    findAllSections,
    findSectionById,
    updateSection,
    increaseSectionSeats,
    decreaseSectionSeats,
    deleteSection

};
