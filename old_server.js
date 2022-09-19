const express = require("express");
const session = require('express-session');
const bcrypt = require('bcrypt');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: 'secret sign-in'
    , name: 'uniqueSessionID'
    , saveUninitialized: false,
    resave: false
}));

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://admin:<password>@cluster0.e2uj8fa.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
    const collection = client.db("test").collection("devices");
    // perform actions on the collection object
    client.close();
});


app.listen(port, () => {
    console.log(`Success! Your application is running on port ${port}.`);
});

let users = [
    {
        username: "testUser",
        password: "password",
    }
];

let appdata = [
    {
        show: "Game of Thrones",
        seasons: 8,
        episodes: 10,
        duration: 60,
        totalTime: 80.0,
    },
    {
        show: "House of the Dragon",
        seasons: 1,
        episodes: 10,
        duration: 60,
        totalTime: 10.0,
    },
    {
        show: "Better Call Saul",
        seasons: 6,
        episodes: 10,
        duration: 45,
        totalTime: 45.0,
    },
];


app.get('/', function (req, res, next) {
    if (req.session.loggedIn) {
        res.sendFile(path.join(__dirname, '/account.html'));
    } else {
        res.sendFile(path.join(__dirname, '/index.html'));
    }
});

app.get('/register', function (req, res) {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.get('/account', function (req, res) {
    // If the user is loggedin
    if (req.session.loggedin) {
        // Output username
        res.send('Welcome back, ' + req.session.username + '!');
        res.end();
    } else {
        // Not logged in
        res.send('Please login to view this page!');
        res.end();
    }
    return;
});

app.post('/register', async function (req, res, next) {

    try {
        console.log("Registering....");
        const newUser = req.body.username;
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        console.log("Line 71");

        if (users.find(newUser => users.username === newUser)) {
            console.log("User already registered");
            return;
        }

        console.log("Line 78");
        let json = {
            username: newUser,
            password: hashedPassword
        }
        users.push(json);

        console.log("Line 85");
        // res.writeHead(200, "OK", {
        //     "Content-Type": "text/plain",
        // });
        // res.end(JSON.stringify(appdata));
        //res.redirect('/account');
        //res.end(JSON.stringify(appdata));

        // res.writeHead(302, {
        //     location: "/account",
        // });
        res.redirect('/public/account.html');

        //res.end(JSON.stringify(appdata));

    } catch {
        console.log("Error");
        res.writeHead(500, "ERROR");
        res.end();
    }

    console.log(users);
    return;
});