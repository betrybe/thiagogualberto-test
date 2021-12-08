const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = require('../models/Users');
const authConfig = require('../config/config');

function validateEmail(email) {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
}

function validateInfos(email, password) {
    if ((email === undefined) || (password === undefined)) {
        return false;
    }        
    return true;
}

module.exports = {
    async login(req, res) {
        const { email, password } = req.body;

        const validadeData = validateInfos(email, password);
                
        if (!validadeData) {
            return res.status(401).json({ message: 'All fields must be filled' });
        }
        
        if (!validateEmail(email)) {
            return res.status(401).json({ message: 'Incorrect username or password' });
        }

        const userExists = await User.findOne({ email, password });
        if (!userExists) {
            return res.status(401).json({ message: 'Incorrect username or password' });
        }
        const id = mongoose.mongo.ObjectId(userExists.id).toString();
        const payload = { id, email, role: userExists.role };
        const { secret, expiresIn } = authConfig.jwt;
        const token = jwt.sign(payload, secret, { subject: id, expiresIn });

        return res.status(200).json({ token });
    },
};