const Recipes = require('../models/Recipes');

const execute = async (dataImageRecipe) => {
    const { id, userId, image } = dataImageRecipe;
    
    const recipe = await Recipes.findById(id);
    if (!recipe) {
        return {
            status: 404,
            err: {
                message: 'recipe not found',
            },
        };
    }

    const recipeUpdated = await Recipes.findOneAndUpdate(id, {
        userId, image,
    }, { new: true });

    return {
        status: 200,
        recipeUpdated,
    };
};

module.exports = {
    execute,
};