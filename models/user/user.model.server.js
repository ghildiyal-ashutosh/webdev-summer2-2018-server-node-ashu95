const mongoose = require('mongoose');

const userSchema = require ('./user.schema.server');

const userModel = mongoose.model('UserModel', userSchema);

 findAllUsers = () =>
     userModel.find();


 findUserByCredentials = (username,password) =>
     userModel.findOne({username: username, password:password});


findUserById = userId =>
    userModel.findById(userId);

createUser = (user) =>
    userModel.create(user);


updateUser = (user) =>

userModel.update({
    _id: user.id
},{
    username:  user.username,
    firstName: user.firstName,
    lastName:  user.lastName,
    email: user.email,
    contact: user.contact
});







module.exports = {
    findAllUsers,
    findUserByCredentials,
    findUserById,
    updateUser,
    createUser
};