const express = require('express'),
    cookie = require('cookie-session'),
    hbs = require('express-handlebars').engine,
    app = express();
const bcrypt = require('bcrypt');
app.engine('handlebars', hbs());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.use(express.urlencoded({ extended: true }));

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://admin:admin@cluster0.hhvf1tq.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
let credCollection = null;
let dataCollection = null;
client.connect()
    .then(() => {
        return client.db('login').collection('credentials');
    })
    .then(__collection => {
        credCollection = __collection;
        return credCollection.find({}).toArray();
    });

client.connect()
    .then(() => {
        return client.db('login').collection('showData');
    })
    .then(__collection => {
        dataCollection = __collection;
        return dataCollection.find({}).toArray();
    });


app.use((req, res, next) => {
    if (credCollection !== null) {
        console.log("Credentials collection is not null");
        next();
    } else {
        console.log("No data found");
        res.status(503).send();
    }
});

// TODO: enable add items
app.post('/submit', express.json(), (req, res) => {
    console.log("Something got submitted to the TV show form");
    console.log("Request body:");
    console.log(req.body);
    req.body.totalTime = ((req.body.seasons * req.body.eps * req.body.duration) / 60).toFixed(2);
    dataCollection.insertOne(req.body).then(result => res.json(result));
    // we don't want this to just return an affirmation that data got entered
    // we need it to return HTML to update the frontend
});

// TODO: enable delete items
// assumes req.body takes form { _id:5d91fb30f3f81b282d7be0dd } etc.
app.post('/remove', (req, res) => {
    console.log("Attempting to remove something");
    dataCollection
        .deleteOne({ _id: mongodb.ObjectId(req.body._id) })
        .then(result => res.json(result))
    // res.writeHead(200, "OK", {
    //     "Content-Type": "text/plain",
    // });
    // res.end(JSON.stringify(appdata));
});

// TODO: implement modifying items
// app.post('/update', (req, res) => {
//     collection
//         .updateOne(
//             { _id: mongodb.ObjectId(req.body._id) },
//             { $set: { name: req.body.name } }
//         )
//         .then(result => res.json(result));
// });

// route to get all docs
app.get('/', (req, res) => {
    if (credCollection !== null) {
        // get array and pass to res.json
        credCollection.find({}).toArray().then(result =>
            //result => res.json(result)
            console.log(result)
        );
    }
    console.log("Default route triggered");
    res.render('index', { layout: false });
});

app.use(express.static(__dirname + "/public")); // serve up static files in the directory public

app.use(cookie({ // cookie middleware
    name: 'session',
    keys: ['key1', 'key2'] // TODO: secure these
}));

app.get('/account', function (req, res) {
    if (req.session.login) {
        console.log("Logged in");
        let tempString = "Welcome, " + req.session.username + "!";
        res.render('main', { msg: tempString, layout: false });
    } else {
        res.send('Please login to view this page!');
        res.end();
    }
    return;
});

// manage login form requests
app.post('/register', express.json(), async (req, res) => {
    console.log(req.body);
    if (req.body.password === "test") { // TODO: search for the right user
        req.session.login = true;
        req.session.username = req.body.username;
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        console.log(hashedPassword);
        credCollection.insertOne(req.body).then(result => res.render('main', { msg: 'login successful!', layout: false }));
    } else {
        req.session.login = false;
        console.log("Rendering failed view");
        res.render('index', { msg: 'login failed, please try again', layout: false });
    }
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