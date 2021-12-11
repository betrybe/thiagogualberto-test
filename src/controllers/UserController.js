const { validationResult } = require('express-validator');
const CreateUserService = require('../services/CreateUserService');

module.exports = {
    async store(req, res) {
        const { name, email, password } = req.body;
        const errors = validationResult(req);
        
        if (!name || !password || !errors.isEmpty()) {
            return res.status(400).json({ message: 'Invalid entries. Try again.' });
        }

        const data = {
            name,
            email,
            password,
            role: 'user',
        };

        const { status, err, user } = await CreateUserService.execute(data);
        
        if (err) return res.status(status).json({ message: err.message });
        return res.status(status).json({ user });
    },
    async storeAdmin(req, res) {
        const { name, email, password } = req.body;
        const errors = validationResult(req);
        
        if (!name || !password || !errors.isEmpty()) {
            return res.status(400).json({ message: 'Invalid entries. Try again.' });
        }

        const data = {
            name,
            email,
            password,
            role: 'admin',
        };

        const { status, err, user } = await CreateUserService.execute(data);
        
        if (err) return res.status(status).json({ message: err.message });
        return res.status(status).json({ user });
    },
};