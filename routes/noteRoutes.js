const express = require('express');
const Router = express.Router();
const { createNote, getNotes, updateNote, deleteNote } = require('../controllers/noteController');
const auth = require('../middleware/auth');

Router.post('/', auth, createNote);
Router.get('/', auth, getNotes);
Router.put('/:id', auth, updateNote);
Router.delete('/:id', auth, deleteNote);

module.exports = Router;