const User = require('../models/User');

function validateEmail(email) {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
}

function validateInfos(name, email, password) {
    if ((name === undefined) || (email === undefined) || (password === undefined)) {
        return false;
    }        
    return true;
}

module.exports = {
    async store(req, res) {
        const { name, email, password } = req.body;
        const validadeData = validateInfos(name, email, password);
                
        if ((!validadeData) || (!validateEmail(email))) {
            return res.status(400).json({ message: 'Invalid entries. Try again.' });
        }

        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(409).json({ message: 'Email already registered' });
        } 

        await User.create({ name, email, password, role: 'user' });

        const user = { name, email, role: 'user' };

        return res.status(201).json({ user });
    },
};