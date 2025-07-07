const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Error handling for uncaught exceptions
process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
    process.exit(1);
});

// Error handling for unhandled promise rejections
process.on('unhandledRejection', (err) => {
    console.error('Unhandled Rejection:', err);
    process.exit(1);
});


app.use(express.json());
app.use(cors());

app.use('/api/notes', require('./routes/noteRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log('✅Connected to MongoDB');
    app.listen(PORT, () => {
        console.log(`🚀 Server is running on http://localhost:${PORT}`);
    });
}).catch(err => {
    console.error('Error connecting to MongoDB:', err);
});

app.get('/', (req, res) => {
    res.send('Welcome to the Notes API');
});

app.get('/health', (req, res) => {
    res.status(200).json({ 
        status: 'OK', 
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
    });
});

