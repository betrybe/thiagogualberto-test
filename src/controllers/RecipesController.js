const Recipes = require('../models/Recipes');

module.exports = {
    async index(req, res) {
        await Recipes.find({}, { name: 1, ingredients: 1, preparation: 1, userId: 1 })
            .then((recipes) => {
                return res.status(200).json(recipes);
            }).catch((err) => {
                return res.status(400).json({ err });
            });

    },
    async show(req, res) {
        const { id } = req.params;
        
        try {
            const recipe = await Recipes.findById(id);

            return res.status(200).json(recipe);
        } catch (err) {
            return res.status(404).json({ 
                message: 'recipe not found',
            });
        }
    },
    async store(req, res) {
        const { name, ingredients, preparation } = req.body;
        const userId = req.id;

        if ((name === undefined) || (ingredients === undefined) || (preparation === undefined)) {
            return res.status(400).json({ message: 'Invalid entries. Try again.' });
        }

        const data = { name, ingredients, preparation, userId, image: '' };

        const recipe = await Recipes.create(data);
        
        return res.status(201).json({ recipe });
    },
};