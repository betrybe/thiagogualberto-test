const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const authConfig = require('../config/config');

module.exports = {
    async validateToken(req, res, next) {
        const token = req.headers.authorization;
        
        try {
            const decode = await promisify(jwt.verify)(token, authConfig.jwt.secret);
            
            req.id = decode.id;

            return next();
        } catch (err) { // Invalid Token
            return res.status(401).json({ message: 'jwt malformed' });
            // return res.status(401).json(err);
        }
    },
};