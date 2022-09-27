const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://templarenoch:v7DBhNxLPUUY721U@dacluster.pqwgabo.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
    const collection = client.db("test").collection("devices");
    // perform actions on the collection object

});

const express = require('express'),
    app = express(),
    GitHubStrategy = require('passport-github2').Strategy,
    passport = require('passport'), //Passport used to authenticate 3rd party login middleware #1
    serveStatic = require('serve-static'), //Serve static files express middleware #2
    bodyparser = require('body-parser'), //Parse HTTP request body express middleware #3
    cookieSession = require("cookie-session"), //Establish cookie-based sessions express middleware #4
    cookieParser = require("cookie-parser"), //Parse cookie header and populate cookie requests express middleware #5
    mongoose = require('mongoose'); //Mongoose used to provide handler for MongoDB middleware #6

// changed urlencoded to receive data from null or original form actions

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
require('dotenv').config();

app.use(cookieSession({
    name: "session",
    keys: [process.env.KEY1, process.env.KEY2]
}))

mongoose.connect(process.env.MONGO_DB_URI);

const userSchema = new mongoose.Schema({
    username: String,
    password: String,

    responseList: {
        response: [{
            age: Number,
            activity: Number,
            gender: String,
            weight: Number,
            height: Number,
            tdee: Number
        }]
    }
});


const User = mongoose.model("User", userSchema);

app.use(express.static('public'))
app.use(bodyparser.json())

app.use(serveStatic('public', { 'index': ['login.html'] }))

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

passport.use(new GitHubStrategy({
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_SECRET,
        callbackURL: "https://tdeecalculator.herokuapp.com/github/logs"
    },
    function(accessToken, refreshToken, profile, done) {
        return done(null, profile);
    }));

app.use(passport.initialize());
app.use(passport.session());

app.get('/auth/error', (req, res) => response.send("Unknown Error"))
app.get('/github/logs', passport.authenticate('github', { failureRedirect: '/auth/error'}),
    function(req, res) {
        res.redirect('/response?id=' + req.user.id)
    })

app.get('/response', async (req, res) => {
    const githubUser = new User( {
        username: req.query.id,
        password: "",
        responseList: {
            response: []
        }
    });
    githubUser.save();
    req.session.login = true;
    req.session.username = req.query.id;
    res.redirect("user.html")
});


app.get('/redirectToUser', bodyparser.json(), (req, res) => {
    if (req.session.login === true) {
        res.json({ redirect: true });
    } else {
        res.json({ redirect: false });
    }
})

app.get('/getUsername', bodyparser.json(), (req, res) => {
    let username = req.session.username;
    res.json({ username: username });
})

app.post('/getTableData', bodyparser.json(), async (req, res) => {
    const user = await User.findOne({ username: req.body.username });
    if (user !== null) {
        console.log(user.responseList);
        res.json({ rows: user.responseList });
    }
})


app.post('/delete', bodyparser.json(), async (req, res) => {
    console.log("Processing row deletion.");
    const user = await User.findOne({ username: req.body.username });
    if (user !== null) {
        console.log("System found user.");
        let rowIndex = req.body.deletingItem;
        user.responseList.response.splice(rowIndex, 1);
        user.save();
        res.json({ success: true });
    }
})

app.post('/edit', bodyparser.json(), async (req, res) => {
    const user = await User.findOne({ username: req.body.username });
    if (user !== null) {
        let rowIndex = req.body.index;
        console.log("splicing at index" + rowIndex);
        user.responseList.response.splice(rowIndex, 1, req.body);
        console.log(req.body);
        user.save();
        res.json({ success: true });
    }
})

app.post('/submit', bodyparser.json(), async (req, res) => {
    const user = await User.findOne({ username: req.body.username });
    if (user !== null) {
        user.responseList.response.push(req.body);
        user.save();
        res.json({ success: true });
    }
})

app.post('/login', bodyparser.json(), async (req, res) => {
    console.log(req.body.username);
    const user = await User.findOne({ username: req.body.username, password: req.body.password });
    if (user == null) {
        req.session.login = false;
        res.json({ loginSuccess: false });
    } else {
        req.session.login = true;
        req.session.username = req.body.username;
        res.json({ loginSuccess: true });
        console.log("User logged in.");
    }
})

app.put('/signOut', (req, res) => {
    req.session.login = false;
    req.session.username = "";
    res.json({ signOutSuccess: true });
});

app.post('/createAccount', bodyparser.json(), async (req, res) => {
    const user = await User.findOne({ username: req.body.username });
    if (user == null) {
        const newUser = new User({
            username: req.body.username,
            password: req.body.password,
            responseList: {
                response: []
            }
        });
        newUser.save();

        req.session.login = true;
        req.session.username = req.body.username;
        res.json({ registrationSuccess: true });
        console.log("User successfully created account.");
    } else {
        req.session.login = false;
        res.json({ registrationSuccess: false });
    }
})



const listener = app.listen(process.env.PORT || 3000, () => {
    console.log("Your app is listening on port " + listener.address().port);
});

// Replace the uri string with your MongoDB deployment's connection string.
/*async function run() {
    try {
        const database = client.db("CS4241");
        const haiku = database.collection("Users");
        // create a document to insert
        const doc = {
            title: "Record of a Shriveled Datum",
            content: "No bytes, no problem. Just insert a document, in MongoDB",
        }
        const result = await haiku.insertOne(doc);
        console.log(`A document was inserted with the _id: ${result.insertedId}`);
    } finally {
        await client.close();
    }
}
run().catch(console.dir);*/