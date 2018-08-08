module.exports = app => {

    createSection = (req,res) => {

        console.log(req.body);
        res.send(req.body);

    }

    findSectionForCourse = (req,res) => {
        var courseId = req.courseId;
        console.log(courseId);
        res.send(courseId);
    }

    app.post('/api/section', createSection);
    app.get('/api/section/:courseId', findSectionForCourse )
}