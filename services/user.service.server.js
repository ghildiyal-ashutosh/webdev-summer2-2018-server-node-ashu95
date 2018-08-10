module.exports = app => {

    const userModel = require('../models/user/user.model.server');

    findAllUsers = (req, res) =>
        userModel.findAllUsers()
            .then(users => {
                res.send(users);
            });

    login = (req, res) => {
        const user = req.body;

        userModel.findUserByCredentials(user.username, user.password)
            .then(user => {
                if (user === null) {
                    res.send({_id: 0})
                }
                else {

                    req.session['currentUser'] = user;
                    res.send(user);
                }
            });
    }

    currentUser = (req, res) => {
        res.send(req.session['currentUser']);
    }

    logOut = (req, res) => {
        req.session.destroy();
        res.send(200);

    }

    registerUser = (req, res) =>
        userModel.createUser(req.body)
            .then(function (user) {
                req.session['currentUser'] = user;
                res.send(user);

            })


    findUserByUsername = (req, res) =>

    userModel.findByUsername(req.params.username)
        .then(user => {
                if (user == null) {
                    res.json({_id: 0})
                }
                else {
                    res.json(user);
                }
            });


    updateProfile = (req,res) =>

        userModel.updateUser(req.body, req.body._id)
            .then (function(user){
                if (user !== null)
                {
                    req.session['currentUser'] = user;
                    res.send(user);
                }
                else
                    res.send({_id : -1})

            });

    deleteProfile = (req,res) =>
        userModel.deleteUser(req.session.currentUser._id);



        findUserById = (req,res) =>
        userModel.findUserById(req.params.userId)
            .then(user => res.json(user));

    findProfile  = (req,res) =>
        res.send(req.session['currentUser']);


        app.get('/api/profile', currentUser);
        app.get('/api/user', findAllUsers);
        app.post('/api/login', login);
       app.post('/api/logout', logOut);
       app.post('/api/register', registerUser);
       app.put('/api/profile', updateProfile);
       app.delete('/api/profile', deleteProfile);
       app.get('/api/username/:username', findUserByUsername);


};

