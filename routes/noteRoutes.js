const express = require('express');
const Router = express.Router();
const { createNote, getNotes, updateNote, deleteNote } = require('../controllers/noteController');
const auth = require('../middleware/auth');

// Apply auth middleware to all routes in this router
Router.use(auth);

Router.post('/', createNote);
Router.get('/', getNotes);
Router.put('/:id', updateNote);
Router.delete('/:id', deleteNote);

module.exports = Router;