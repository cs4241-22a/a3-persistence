const express = require('express'),
    cookie = require('cookie-session'),
    hbs = require('express-handlebars').engine,
    app = express();

app.use(express.urlencoded({ extended: true }));

app.engine('handlebars', hbs());
app.set('view engine', 'handlebars');
app.set('views', './views');

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://admin:<password>@cluster0.e2uj8fa.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
    const collection = client.db("test").collection("devices");
    // perform actions on the collection object
    client.close();
});

app.use(express.static(__dirname + "/public")); // serve up static files in the directory public

app.use(cookie({ // cookie middleware
    name: 'session',
    keys: ['key1', 'key2'] // TODO: secure these
}));

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

// add some middleware that always sends unauthenticated users to the login page
// app.use(function (req, res, next) {
//     console.log("I am now checking to see if the user is logged in!");
//     if (req.session.login) {
//         console.log("You are logged in!");
//         next();
//     } else {
//         console.log("not logged in...");
//         res.render('index', { msg: 'You are not logged in', layout: false });
//     }
// });

app.get('/account', function (req, res) {
    if (req.session.login) {
        console.log("Logged in");
        res.render('main', { msg: 'success you have logged in', layout: false });
    } else {
        res.send('Please login to view this page!');
        res.end();
    }
    return;
});

// manage login form requests
app.post('/register', express.json(), (req, res) => {
    console.log(req.body);
    if (req.body.password === "test") {
        req.session.login = true;
        req.session.username = req.body.username;
        console.log("Rendering main view");
        res.render('main', { msg: 'login successful!' });
    } else {
        req.session.login = false;
        console.log("Rendering failed view");
        res.render('index', { msg: 'login failed, please try again', layout: false });
    }
});

app.post('/submit', express.json(), (req, res) => {
    console.log("Something got submitted to the TV show form");
});

app.post('/remove', express.json(), (req, res) => {
    console.log("Attempting to remove something");
    res.writeHead(200, "OK", {
        "Content-Type": "text/plain",
    });
    res.end(JSON.stringify(appdata));
});

app.post('/logout', express.json(), (req, res, next) => {
    console.log("Logging out");
    if (req.session.login) {
        req.session.username = "";
        req.session.login = false;
        console.log("Re-rendering");
        res.render('main', { msg: 'Logged out successfully!', layout: false });
    } else {
        next();
    }
});

app.listen(3000);