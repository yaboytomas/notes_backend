const express = require('express');
const Router = express.Router();
const { register, login } = require('../controllers/userController');

Router.post('/register', register);
Router.post('/login', login);

module.exports = Router;