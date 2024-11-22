const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: [true, 'Please add a name'],
    },
    password: {
        type: String,
        required: [true, 'Please add a password']
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true
    }
});

module.exports = mongoose.model('User', UserSchema);