const GitHubStrategy = require('passport-github2').Strategy;
const {MongoClient, ServerApiVersion} = require('mongodb');
const session = require('express-session');
const passport = require('passport');
const express = require('express')
const {response} = require("express");
const uri = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@a3-assignment.o7vkxfj.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1});
const app = express()
const port = 3000
let collection = null
require('dotenv').config()

const appdata = {
    summary: {
        averageTimeAsleep: 0,
        averageSleepRating: 0,
        dreamPercentage: 0,
        numberOfRecords: 0
    },
    sleepData: {}
}

// await client.connect()

passport.serializeUser(function (user, done) {
    done(null, user);
});
passport.deserializeUser(function (user, done) {
    done(null, user);
});

passport.use(new GitHubStrategy({
    clientID: process.env.GH_CLIENT_ID,
    clientSecret: process.env.GH_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/github/callback"
}, function (accessToken, refreshToken, profile, done) {
    return done(null, profile);
}));

app.use(session({
    secret: 'sadf;lkjsdflkjas;dlkjnvjkeiruf', resave: false, saveUninitialized: true
}))

app.use(express.static('public'));
app.use(express.urlencoded({extended: true}))
const isLoggedIn = (req, res, next) => {
    if (req.user) {
        next();
    } else {
        res.redirect('/auth/github')
    }
}

app.use(passport.initialize());

app.use(passport.session());

app.get('/auth/error', (req, res) => res.send('Unknown Error'))

app.get('/auth/github', passport.authenticate('github', {scope: ['user:email']}));

app.get('/auth/github/callback', passport.authenticate('github', {failureRedirect: '/auth/error'}), function (req, res) {
    res.redirect('/');
});

app.get('/', isLoggedIn, (req, res) => {
    console.log(req.user)
    res.sendFile(__dirname + '/protected/index.html');
})

app.get('/getData', (req, res) => {
    res.json(appdata);
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
