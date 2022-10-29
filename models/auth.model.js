const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

const DB_URL = 'mongodb://localhost:27017/ecommerce';

const userSchema = mongoose.Schema({
   username: String,
   email: String,
   password: String
});

const User = mongoose.model("user", userSchema);

exports.createNewUser = (username, email, password) => {
    // check if email exists
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL).then(() => {
            return User.findOne({email: email})
        }).then(user => {
            if(user){
                mongoose.disconnect();
                reject ('email is used');
            } else {
                 return bcrypt.hash(password, 10)
            }
        }).then(hashedPassword => {
            let user = new User({
               username: username,
               email: email,
               password: hashedPassword
            });

            return user.save()
        }).then(() => {
            mongoose.disconnect();
            resolve();
        }).catch(err => {
            mongoose.disconnect();
            reject(err)
        });
    })
}
