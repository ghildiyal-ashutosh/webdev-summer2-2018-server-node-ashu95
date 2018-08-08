const mongoose = require('mongoose');

const userSchema = require ('./user.schema.server');

const userModel = mongoose.model('UserModel', userSchema);

 findAllUsers = () =>
     userModel.find();


 findUserByCredentials = (username,password) =>
     userModel.findOne({username: username, password:password});




module.exports = {
    findAllUsers,
    findUserByCredentials
};