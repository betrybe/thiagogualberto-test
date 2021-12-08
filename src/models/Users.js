const mongoose = require('mongoose');

const UserModel = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: false,
    },
});

const users = mongoose.model('users', UserModel);

module.exports = users;