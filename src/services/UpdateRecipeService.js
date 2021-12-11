const Recipes = require('../models/Recipes');

const execute = async (dataRecipe) => {
    const { id, name, ingredients, preparation, userId } = dataRecipe;
    
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
        name, ingredients, preparation, userId,
    }, { new: true });

    return {
        status: 200,
        recipeUpdated,
    };
};

module.exports = {
    execute,
};