const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const authConfig = require('../config/config');

module.exports = {
    async validateToken(req, res, next) {
        const token = req.headers.authorization;

        if (!token) {
            return res.status(401).json({ message: 'missing auth token' });
        }
        
        try {
            const decode = await promisify(jwt.verify)(token, authConfig.jwt.secret);
            
            req.id = decode.id;
            req.role = decode.role;

            return next();
        } catch (err) { // Invalid Token
            return res.status(401).json({ message: 'jwt malformed' });
            // return res.status(401).json(err);
        }
    },
};