module.exports = app => {

    const userModel = require('../models/user/user.model.server');

    findAllUsers = (req,res) =>
        userModel.findAllUsers()
            .then(users => {
                res.send(users);
            });

    login = (req,res) => {
        const  user = req.body;

        userModel.findUserByCredentials(user.username, user.password)
            .then(user => {
                req.session['currentUser'] = user;
                res.send(req.session);
            });
    };

    currentUser = (req,res) => {
        res.send(req.session['currentUser']);
    }

    logOut = (req,res) => {
        let user = {username:'Negative', password:''};
        req.session['currentUser'] = user;
        res.send(req.session);

    }

    registerUser = (req,res) =>
        userModel.createUser(req.body)
            .then(function (user) {
                req.session['currentUser'] = user;
                req.send(user);

            })


    findUserByUsername = (req,res) =>
        userModel.findUserByCredentials(req.body)
            .then(user => res.json(user));

    updateProfile = (req,res) =>

        userModel.updateUser(req.body)
            .then (function(){
                req.session['currentUser'] = user;
                res.send(user);
            })

    function deleteProfile (req,res) {
        req.session.destroy();
        res.send(200);
    }




    findUserById = (req,res) =>
        userModel.findUserById(req.params.userId)
            .then(user => res.json(user));

    findProfile  = (req,res) =>
        res.send(req.session['currentUser']);


        app.get('/currentUser', currentUser);
        app.get('/api/user', findAllUsers);
        app.post('/login', login);
       app.post('/logout', logOut);

};

