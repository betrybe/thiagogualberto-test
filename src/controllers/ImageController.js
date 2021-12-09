const Recipes = require('../models/Recipes');

module.exports = {
    async update(req, res) {
        const { id } = req.params;
        const userId = req.id;
        const userRole = req.role;
        
        const recipe = await Recipes.findById(id);
        if (!recipe) {
            return res.status(404).json({ message: 'recipe not found' });            
        }

        if ((userId === recipe.userId) || (userRole === 'admin')) {
            const image = `localhost:3000/src/uploads/${id}.jpeg`;
            const recipeUpdated = await Recipes.findOneAndUpdate(id, {
                userId, image,
            }, { new: true });
            return res.status(200).json(recipeUpdated);
        }
    },
};