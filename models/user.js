const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
var Schema = mongoose.Schema;

mongoose.connect(process.env.MONGODB_URI);

var db = mongoose.connection;

var UserSchema =  mongoose.Schema({
    email: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        minlength: 3,
        trim: true,
        unique: true,
        index: true
    },
    name: {
        type: String,
        minlength:4,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    profilepicture: {
        type: String,
  
    }
});



var User =module.exports = mongoose.model('User', UserSchema);
 

module.exports.createUser = function(newUser, callback){
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(newUser.password, salt, function(err, hash) {
            // Store hash in your password DB. 
            newUser.password = hash;
            newUser.save(callback);
        });
    });
   
}
module.exports.getUserById = function(id, callback){
    User.findById(id, callback);
};

module.exports.getUserByUsername = function(username, callback){
    var query = {username: username};
    User.findOne(query, callback);

}
module.exports.comparePassword = function(candidatePassword, hash, callback){
    bcrypt.compare(candidatePassword, hash, function(err, isMatch){
        callback(null, isMatch);
    })
}

