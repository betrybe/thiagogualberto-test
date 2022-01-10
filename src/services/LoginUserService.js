const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/config');

const User = require('../models/Users');

const execute = async (userData) => {
    const { email, password } = userData;
    const userExists = await User.findOne({ email, password });

    if (!userExists) {
        return {
            status: 401,
            err: { message: 'Incorrect username or password' },
        };
    }

    const id = mongoose.mongo.ObjectId(userExists.id).toString();
    const payload = { id, email, role: userExists.role };
    const { secret, expiresIn } = authConfig.jwt;
    const token = jwt.sign(payload, secret, { subject: id, expiresIn });

    return { status: 200, token };
};

module.exports = {
    execute,
};