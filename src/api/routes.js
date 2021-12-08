const express = require('express');

const routes = express.Router();

// Controllers
const UserController = require('../controllers/UserController');
const LoginController = require('../controllers/LoginController');

// Login Route
routes.post('/login', LoginController.login);

// User Routes
routes.post('/users', UserController.store);

module.exports = routes;