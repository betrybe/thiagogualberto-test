const express = require('express');

const routes = express.Router();

// Controllers
const UserController = require('../controllers/UserController');
const LoginController = require('../controllers/LoginController');
const RecipesController = require('../controllers/RecipesController');

// Middlewares
const authMiddleware = require('../middlewares/auth');

// Login Route
routes.post('/login', LoginController.login);

// User Routes
routes.post('/users', UserController.store);

// Recipes Routes
routes.get('/recipes', RecipesController.index);
routes.get('/recipes/:id', RecipesController.show);
routes.use(authMiddleware.validateToken);
routes.post('/recipes', RecipesController.store);
routes.put('/recipes/:id', RecipesController.update);
routes.delete('/recipes/:id', RecipesController.delete);

// Admin User Routes
routes.post('/users/admin', UserController.storeAdmin);

module.exports = routes;