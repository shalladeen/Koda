const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const { insertUser } = require('./db');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// Endpoint to handle sign-ups
app.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;
    
    try {
        // TODO: Hash the password using a library like bcrypt before storing it
        const hashedPassword = password; // Replace this with the actual hashed password
        
        // Insert the user into the database
        const newUser = await insertUser(name, email, hashedPassword);
        console.log(`New user created: ${newUser.name}, email: ${newUser.email}`);
        
        // Send a success response
        res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
        console.error('Error creating new user:', error);
        res.status(500).json({ message: 'Error creating new user' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
