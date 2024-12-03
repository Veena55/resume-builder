// const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const User = require('../models/User');
require('dotenv').config();

// passport.serializeUser((user, done) => {
//     done(null, user.id);
// });

// passport.deserializeUser((id, done) => {
//     User.findById(id).then(user => {
//         done(null, user);
//     });
// });

// passport.use(new GoogleStrategy(
//     {
//         clientID: process.env.GOOGLE_CLIENT_ID,
//         clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//         callbackURL: '/auth/google/callback',
//     },
//     async (accessToken, refreshToken, profile, done) => {
//         const exitingUser = await User.findOne({ googleId: profile.id });
//         if (exitingUser) {
//             return done(null, exitingUser);
//         }
//         const newUser = await new User({
//             googleId: profile.id,
//             displayName: profile.displayName,
//             email: profile.emails[0].value,
//             token: accessToken
//         }).save();
//         done(null, newUser);
//     }
// ))



// router.get('/google', passport.authenticate('google', {
//     scope: ['profile', 'email']
// }));

// router.get('/google/callback', passport.authenticate('google', (req, res) => {
//     const token = jwt.sign({ id: req.user.id }, process.env.JWT_SECRET, { expires: '1h' });
//     res.redirect(`http://localhost:5173?token=${token}`);
// }));