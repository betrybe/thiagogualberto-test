const express = require('express');

const routes = express.Router();

// Controllers
const UserController = require('../controllers/UserController');

// User Routes
routes.post('/users', UserController.store);
/* routes.post('/users', (req, res) => {
    return res.json({ message: 'Ops' });
}); */

module.exports = routes;