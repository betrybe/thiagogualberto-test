const mongoose = require('mongoose');

const RecipeModel = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    ingredients: {
        type: String,
        required: true,
    },
    preparation: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: false,
    },
    image: {
        type: String,
        required: false,
    },
});

const recipes = mongoose.model('recipes', RecipeModel);

module.exports = recipes;