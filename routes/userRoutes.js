const express = require('express');
const Router = express.Router();
const { register, login, signOut } = require('../controllers/userController');

Router.post('/register', register);
Router.post('/login', login);
Router.post('/signout', signOut);

module.exports = Router;