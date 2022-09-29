import express from "express";
import * as mongodb from "mongodb";
import { promises as fs } from "fs";
import cookie from "cookie-session";
import passport from "passport";
import morgan from "morgan";
import session from "express-session";
process.env.PORT = '3000';
// get mongodb credentials from mongodb.config.json
const credentials = JSON.parse(await fs.readFile('./mongodb.config.json', 'utf-8'));
const uri = "mongodb+srv://" + credentials.username + ':' + credentials.password + '@' + credentials.host;
// Setup static express
const app = express();
// Middleware
app.use(morgan('tiny')); // Logging
app.use(cookie({
    name: 'session',
    keys: ['key1', 'key2']
}));
app.use(express.static('src', { index: "login.html" })); // Login page
app.use('home', express.static('src')); // Home page
app.use(express.json()); // Json parsing
// Express session middleware
app.set('trust proxy', 1); // trust first proxy
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}));
app.use(passport.initialize()); // Initialize Passport
app.use(passport.session()); // Start passport session
// Setup client and connection
// @ts-ignore
const client = new mongodb.MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
let canvasCollection = null;
// Login from post request
app.post('/login', passport.authenticate('local', { failureRedirect: '/' }), (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    res.redirect('/home');
});
// Connect to Paths database
client.connect()
    .then(() => {
    return client.db('Canvas').collection('Paths');
})
    .then(_collection => {
    canvasCollection = _collection;
    return _collection.find({}).toArray();
})
    .then(console.log);
// route to get all docs
app.get('/canvas', (req, res) => {
    canvasCollection?.find({}).toArray()
        .then(paths => {
        res.json(paths);
    });
});
// Route push a new line to the server
app.post('/draw', (req, res) => {
    const newPath = req.body;
    // Push to MongoDB
    canvasCollection?.insertOne(newPath)
        .then(result => {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        return canvasCollection?.find({}).toArray();
    })
        .then(paths => {
        res.end(JSON.stringify(paths));
    });
});
// Delete all lines associated with user
app.delete('/clear', (req, res) => {
    const auth = req.body;
    // Push to MongoDB
    canvasCollection?.deleteMany({ user: auth.userID })
        .then(result => {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(result));
    });
});
app.listen(process.env.PORT);
