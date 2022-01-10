const Recipes = require('../models/Recipes');

const execute = async (recipeId) => {
    try {
        const recipe = await Recipes.findById(recipeId);

        if (!recipe) {
            return {
                status: 404,
                err: {
                    message: 'recipe not found',
                },
            };
        }

        return {
            status: 200,
            recipe,
        };
    } catch (err) {
        console.log(err);
    }
};

module.exports = {
    execute,
};