const UpdateImageRecipeService = require('../services/UpdateImageRecipeService');

module.exports = {
    async update(req, res) {
        const { id } = req.params;
        const userId = req.id;
        
        const image = `localhost:3000/src/uploads/${id}.jpeg`;

        const data = {
            id,
            userId,
            image,
        };

        const { status, err, recipeUpdated } = await UpdateImageRecipeService.execute(data);
        
        if (err) return res.status(status).json({ message: err.message });
        return res.status(status).json(recipeUpdated);
    },
};