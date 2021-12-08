const Recipes = require('../models/Recipes');

module.exports = {
    /* async index(req, res) {
        const recipe = await Recipes.find({}, { name: 1, ingredients: 1, preparation: 1, userId: 1 });
        
        return res.status(200).json({ recipe });
    }, */
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