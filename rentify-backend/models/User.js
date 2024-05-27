//User.js

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: { type: String, unique: true },
    phoneNumber: String,
    password: String,
    isSeller: Boolean,
});

module.exports = mongoose.model('User', userSchema);
