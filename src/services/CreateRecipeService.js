const Recipes = require('../models/Recipes');

const execute = async (newRecipe) => {
    const recipe = await Recipes.create(newRecipe);

    return { status: 201, recipe };
};

module.exports = {
    execute,
};