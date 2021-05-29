const mongoose = require('mongoose');
const validator = require('validator');
const { Schema } = mongoose;

const userSchema = new Schema({
    email: {
        type: String,
        require: [true, 'email is required'],
        unique: true,
        validate: [validator.isEmail, 'Email is Invalid']
    },
    password: {
        type: String,
        require: [true, 'password is required'],
        min: [8, 'password must be of 8 characters']
    }
})

userSchema.post('save', (error, doc, next) => {
    if (error.name === 'MongoError' && error.code === 11000) {
        next(new Error('email already exists!'));
    } else {
        next();
    }
});

module.exports = mongoose.model('User', userSchema)