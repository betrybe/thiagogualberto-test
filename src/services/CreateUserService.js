const User = require('../models/Users');

const execute = async (newUser) => {
    const { email } = newUser;
    const userExists = await User.findOne({ email });

    if (userExists) {
        return {
            status: 409,
            err: { message: 'Email already registered' },
        };
    } 

    const data = await User.create(newUser);

    const user = {
        _id: data.id,
        name: data.name,
        email: data.email,
        role: data.role,            
    };

    return { status: 201, user };
};

module.exports = {
    execute,
};