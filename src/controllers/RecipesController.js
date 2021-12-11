const mongoose = require('mongoose');

const CreateRecipeService = require('../services/CreateRecipeService');
const ListAllRecipesService = require('../services/ListAllRecipesService');
const ListRecipeService = require('../services/ListRecipeService');
const UpdateRecipeService = require('../services/UpdateRecipeService');
const DeleteRecipeService = require('../services/DeleteRecipeService');

module.exports = {
    async index(req, res) {
        const { status, recipes } = await ListAllRecipesService.execute();
        
        return res.status(status).json(recipes);
    },
    async show(req, res) {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ message: 'recipe not found' });
        }
        
        const { status, err, recipe } = await ListRecipeService.execute(id);

        if (err) return res.status(status).json({ message: err.message });
        
        return res.status(status).json(recipe);
    },
    async store(req, res) {
        const { name, ingredients, preparation } = req.body;
        const userId = req.id;

        if (!name || !ingredients || !preparation) {
            return res.status(400).json({ message: 'Invalid entries. Try again.' });
        }

        const data = { 
            name, 
            ingredients, 
            preparation, 
            userId, 
            image: '',
        };

        const { status, err, recipe } = await CreateRecipeService.execute(data);
        
        if (err) return res.status(status).json({ message: err.message });
        return res.status(status).json({ recipe });
    },
    async update(req, res) {        
        const { id } = req.params;
        const { name, ingredients, preparation } = req.body;
        const userId = req.id;

        const data = {
            id,
            name, 
            ingredients, 
            preparation, 
            userId, 
        };
        
        const { status, err, recipeUpdated } = await UpdateRecipeService.execute(data);
        
        if (err) return res.status(status).json({ message: err.message });
        return res.status(status).json(recipeUpdated);     
    },
    async delete(req, res) {        
        const { id } = req.params;
        
        const { status, err } = await DeleteRecipeService.execute(id);

        if (err) return res.status(status).json({ message: err.message });
        return res.status(status).json();              
    },
};