const mongoose = require('mongoose');
const { isEmail } = require("validator");
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "The email field is required."],
        unique: true,
        lowercase: true,
        validate: [isEmail, "Please enter a valid email address."],
    },
    password: {
        type: String,
        required: [true, "Password field is required."],
        minlength: [6, "Minimum password length of 6 characters"],
    },
});

userSchema.post('save', (doc, next) => {
    console.log(doc, "new user was created and saved")
    next();
});

// fire a func before user is saved
userSchema.pre('save', async function (next) {
    console.log(this, "User about to be created.");
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

const User = mongoose.model('user', userSchema);

module.exports = User;
