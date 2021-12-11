const Recipes = require('../models/Recipes');

const execute = async (recipeId) => {
    const recipe = await Recipes.findById(recipeId);
    if (!recipe) {
        return {
            status: 404,
            err: {
                message: 'recipe not found',
            },
        };
    }

    await Recipes.findOneAndDelete(recipeId);

    return { 
        status: 204,
    };
};

module.exports = {
    execute,
};