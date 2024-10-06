const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors()); // Enable CORS for all origins (optional)
app.use(bodyParser.json()); // Parse JSON bodies
app.use(express.static('public')); // Serve static files from 'public' folder

// Function to read users from data.json
const readUsersFromFile = () => {
    if (!fs.existsSync('data.json')) {
        // Create the file with an empty array if it doesn't exist
        fs.writeFileSync('data.json', JSON.stringify([]));
        return [];
    }
    const data = fs.readFileSync('data.json', 'utf8');
    return JSON.parse(data);
};

// Function to write users to data.json
const writeUsersToFile = (users) => {
    fs.writeFileSync('data.json', JSON.stringify(users, null, 2));
};

// Sign up endpoint
app.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;

    // Validate input
    if (!name || !email || !password) {
        return res.status(400).json({ success: false, error: 'Name, email, and password are required' });
    }

    // Read existing users from file
    const users = readUsersFromFile();

    // Check if user already exists
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
        return res.status(400).json({ success: false, error: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    users.push({ name, email, password: hashedPassword });
    
    // Write updated users back to file
    writeUsersToFile(users);

    return res.status(201).json({ success: true, message: 'User registered successfully' });
});

// Login endpoint
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    // Validate input
    if (!email) {
        return res.status(400).json({ success: false, error: 'Email is required' });
    }
    if (!password) {
        return res.status(400).json({ success: false, error: 'Password is required' });
    }

    // Read users from file
    const users = readUsersFromFile();
    
    // Fetch user from file
    const user = users.find(user => user.email === email);
    if (!user) {
        return res.status(401).json({ success: false, error: 'User not found' });
    }

    // Compare password
    const match = await bcrypt.compare(password, user.password);
    if (match) {
        return res.json({ success: true, name: user.name });
    } else {
        return res.status(401).json({ success: false, error: 'Invalid password' });
    }
});

// Serve HTML files
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html')); // Serve index.html
});

app.get('/dashboardprofile', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'dashboardprofile.html')); // Serve dashboard profile page
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
