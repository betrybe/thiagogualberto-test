const Recipes = require('../models/Recipes');

const execute = async (data) => {
    const { id, userId, roleUser } = data;
    const recipe = await Recipes.findById(id);
    if (!recipe) {
        return {
            status: 404,
            err: { message: 'recipe not found' },
        };
    }

    if ((userId === recipe.userId) || (roleUser === 'admin')) {
        await Recipes.findOneAndDelete(id);
        
        return { status: 204 };
    }

    return {
        status: 401,
        err: { message: 'User Unauthorized' },
    };
};

module.exports = {
    execute,
};