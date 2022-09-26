const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require("../models/user");

const GitHubStrategy = require('passport-github').Strategy;

passport.use(
    new GitHubStrategy({
        clientID: process.env['GITHUB_CLIENT_ID'],
        clientSecret: process.env['GITHUB_CLIENT_SECRET'],
        callbackURL: process.env['GITHUB_CALLBACK_URL']
    },
    function(accessToken, refreshToken, profile, cb) {
        User.findOrCreate({ id: profile.id}, {username: profile.username, displayName: profile.displayName, email: profile.emails[0].value, profilePhoto: profile.photos[0].value}, function (err, user) {
            console.log("User Logged in (new=%s): %s", user.isNew, user.doc);
            return cb(err, user);
        });
    }
));

passport.serializeUser(function(user, cb) {
    process.nextTick(function() {
        //cb(null, user._id)
        user = user.doc
        cb(null, {
            id: user.id,
            username: user.username,
            displayName: user.displayName, 
            email: user.email, 
            profilePhoto: user.profilePhoto
        });
    });
});

passport.deserializeUser(function(user, cb) {
    process.nextTick(function() {
        cb(null, user)
    });
});

router.get('/login/federated/github', passport.authenticate('github'));

router.get('/auth/github/callback', passport.authenticate('github', {
    successRedirect: '/',
    failureRedirect: '/login'
}));

router.post('/logout', function(req, res, next) {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
});

module.exports = router;