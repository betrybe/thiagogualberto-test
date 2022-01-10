const Recipes = require('../models/Recipes');

const execute = async (dataRecipe) => {
    const { id, name, ingredients, preparation, userId, roleUser } = dataRecipe;
    
    const recipe = await Recipes.findById(id);
    if (!recipe) {
        return {
            status: 404,
            err: { message: 'recipe not found' },
        };
    }

    if ((userId === recipe.userId) || (roleUser === 'admin')) {
        const recipeUpdated = await Recipes.findOneAndUpdate(id, {
            name, ingredients, preparation, userId: recipe.userId,
        }, { new: true });
        
        return { status: 200, recipeUpdated };
    }

    return {
        status: 401,
        err: { message: 'User Unauthorized' },
    };
};

module.exports = {
    execute,
};