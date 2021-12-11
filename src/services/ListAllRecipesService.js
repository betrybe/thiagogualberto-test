const Recipes = require('../models/Recipes');

const execute = async () => {
    const recipes = await Recipes.find({}, { name: 1, ingredients: 1, preparation: 1, userId: 1 });

    return {
        status: 200,
        recipes,
    };
};

module.exports = {
    execute,
};