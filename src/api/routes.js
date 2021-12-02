const { Router } = require('express');

const UserController = require('../app/controllers/UserController');

const routes = new Router();

routes.post('/users', UserController.store);
/* routes.post('/users', (req, res) => {
    return res.json({ message: 'Ops' });
}); */

module.exports = routes;