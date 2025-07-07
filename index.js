const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();


app.use(express.json());
app.use(cors());

app.use('/api/notes', require('./routes/notes'));
app.use('/api/users', require('./routes/users'));

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,      
    useUnifiedTopology: true,
}).then(() => {
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

