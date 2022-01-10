const { validationResult } = require('express-validator');
const LoginUserService = require('../services/LoginUserService');

module.exports = {
    async login(req, res) {
        const { email, password } = req.body;
        const errors = validationResult(req);

        if (!email || !password) {
            return res.status(401).json({ message: 'All fields must be filled' });
        }
        
        if (!errors.isEmpty()) {
            return res.status(401).json({ message: 'Incorrect username or password' });
        }

        const data = {
            email,
            password,
        };

        const { status, err, token } = await LoginUserService.execute(data);
        
        if (err) return res.status(status).json({ message: err.message });
        return res.status(status).json({ token });
    },
};