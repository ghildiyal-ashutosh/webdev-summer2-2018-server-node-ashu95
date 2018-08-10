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

deleteUser = (userId) =>
    userModel.remove({_id : userId})


updateUser = (user,userId) =>

userModel.update({
    _id: userId
},{
    username:  user.username,
    firstName: user.firstName,
    lastName:  user.lastName,
    email: user.email,
    contact: user.contact
});

findByUsername = (username) =>
         userModel.findOne({username: username});







module.exports = {
    findAllUsers,
    findUserByCredentials,
    findUserById,
    updateUser,
    createUser,
    deleteUser,
    findByUsername
};