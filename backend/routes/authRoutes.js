const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const { OAuth2Client } = require('google-auth-library');
const checkAuth = require('../middlewares/checkAuth');

const router = express.Router();
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);


router.get('/protected-route', checkAuth, (req, res) => {
    res.json({ message: 'Protected route accessed', user: req.user });
});


router.post('/verify_token', async (req, res) => {
    const { token } = req.body;
    try {
        // Verify the ID token
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID,
        });
        const payload = ticket.getPayload();
        const { sub, name, email } = payload;

        // Find or create the user in the database
        let user = await User.findOne({ email });
        if (!user) {
            user = new User({ googleId: sub, username: name, email });
            await user.save();
        } else {
            const result = await User.updateOne({ email }, { $set: { googleId: sub } });
            // console.log("user", result);
        }
        const jwtToken = await generateJWTToken({ sub: user._id, name: user.username, email: user.email });
        res.json({ token: jwtToken, user });
    } catch (error) {
        console.error('Error verifying token:', error);
        res.status(400).json({ error: 'Invalid token' });
    }
});

// Signup route
router.post('/signup', async (req, res) => {
    try {
        const { email, password, username } = req.body;
        const userEmail = await User.findOne({ email });
        if (userEmail) {
            return res.status(401).json({ message: "User is already exists!" });
        }

        //hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        //create user
        const user = new User({
            username,
            email,
            password: hashedPassword
        });

        // Save the user to the database
        await user.save();

        return res.status(201).json({ message: 'User created successfully' });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});


// Login route
router.post('/login', async (req, res) => {
    console.log("hi");

    try {
        const { email, password } = req.body.data;

        //find the user by email
        const user = await User.findOne({ email });

        // Check if the user exists
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        //compare the passwords
        const passwordMatch = await bcrypt.compare(password, user.password);

        // If passwords don't match, return an error
        if (!passwordMatch) {
            return res.status(404).json({ message: "Invalid Credentials" });
        }

        //Generate JWT token
        const token = generateJWTToken({ userId: user.id });
        res.status(200).json({ token });


    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

const generateJWTToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '24h' });
}
module.exports = router;