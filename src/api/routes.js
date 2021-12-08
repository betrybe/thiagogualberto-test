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
routes.use(authMiddleware.validateToken);
routes.post('/recipes', authMiddleware.validateToken, RecipesController.store);
// routes.get('/recipes', RecipesController.index);

module.exports = routes;