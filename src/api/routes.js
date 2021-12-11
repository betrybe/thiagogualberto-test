const express = require('express');

const routes = express.Router();

const { body } = require('express-validator');

// Resourcer for image upload
const multer = require('multer');
const uploadConfig = require('../middlewares/upload');

// Controllers
const UserController = require('../controllers/UserController');
const LoginController = require('../controllers/LoginController');
const RecipesController = require('../controllers/RecipesController');
const ImageController = require('../controllers/ImageController');

// Middlewares
const authMiddleware = require('../middlewares/auth');

// Instance multer
const upload = multer(uploadConfig);

// Login Route
routes.post('/login', [body('email').isEmail()], LoginController.login);

// User Routes
routes.post('/users', [body('email').isEmail()], UserController.store);

// Recipes Routes
routes.get('/recipes', RecipesController.index);
routes.get('/recipes/:id', RecipesController.show);
routes.use(authMiddleware.validateToken);
routes.post('/recipes', RecipesController.store);
routes.put('/recipes/:id', RecipesController.update);
routes.delete('/recipes/:id', RecipesController.delete);

// Admin User Routes
routes.post('/users/admin', 
    [body('email').isEmail()], authMiddleware.validateAdmin, UserController.storeAdmin);

// Image Recipe Routes
routes.put('/recipes/:id/image', upload.single('image'), ImageController.update);

module.exports = routes;