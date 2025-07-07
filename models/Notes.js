const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    title: {    
        type: String,
        required: true,
        trim: true
    },
    content: {
        type: String,
        required: true,
        trim: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }, 
    timestamp: {
        type: Date,
        default: Date.now
    }   
});

module.exports = mongoose.model('Note', noteSchema);
