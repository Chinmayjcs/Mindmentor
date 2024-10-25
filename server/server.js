// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const { User, Psychologist, Admin } = require('./schema'); // Import schemas

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());

// Database URIs for each account type
const mongoURIs = {
    userDB: 'mongodb+srv://chinmayj360:%23CJ%402024@mindmentorcluster.o2i19.mongodb.net/userDB?retryWrites=true&w=majority&appName=MindMentorCluster',
    psychologistDB: 'mongodb+srv://chinmayj360:%23CJ%402024@mindmentorcluster.o2i19.mongodb.net/psychologistDB?retryWrites=true&w=majority&appName=MindMentorCluster',
    adminDB: 'mongodb+srv://chinmayj360:%23CJ%402024@mindmentorcluster.o2i19.mongodb.net/adminDb?retryWrites=true&w=majority&appName=MindMentorCluster',
};

// Connect to User Database by default
mongoose.connect(mongoURIs.userDB)
    .then(() => console.log('Connected to User Database'))
    .catch(err => console.error('Connection Error:', err));

// Route for registration
app.post('/register', async (req, res) => {
    try {
        const { accountType, ...userData } = req.body;
        let user;

        // Use the appropriate database based on account type
        if (accountType === 'psychologist') {
            await mongoose.disconnect();
            await mongoose.connect(mongoURIs.psychologistDB);
            user = new Psychologist(userData);
        } else if (accountType === 'admin') {
            await mongoose.disconnect();
            await mongoose.connect(mongoURIs.adminDB);
            user = new Admin(userData);
        } else {
            // Defaults to user database connection
            user = new User(userData);
        }

        await user.save();
        res.status(201).json({ message: 'User registered successfully!' });
    } catch (error) {
        console.error('Registration Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    } finally {
        await mongoose.disconnect();
        await mongoose.connect(mongoURIs.userDB); // Reconnect to the User Database by default
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});