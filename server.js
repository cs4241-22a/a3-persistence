// 1. Properly verify login (basically treat login as registration, just keep the users straight)
// 2. Write a query to look up shows by user id
// 3. Fix add route
// 4. Fix remove route
// 5. Implement modification frontend
// 6. Write modification route

const express = require('express'),
    mongoose = require('mongoose'),
    cookie = require('cookie-session'),
    hbs = require('express-handlebars').engine,
    app = express();
const bcrypt = require('bcrypt');
app.engine('handlebars', hbs());
app.set('view engine', 'handlebars');
app.set('views', './views');

require('mongoose-double')(mongoose);

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true
        },
        password: {
            type: String,
            required: true
        }
    },
    { collection: 'users' }
);

const User = mongoose.model('User', userSchema);

const entrySchema = new mongoose.Schema(
    {
        show: {
            type: String,
            required: true,
        },
        seasons: {
            type: Number,
            required: true
        },
        eps: {
            type: Number,
            required: true
        },
        duration: {
            type: Number,
            required: true
        },
        totalTime: {
            type: mongoose.Schema.Types.Double,
            required: true
        },
        user: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'User',
            required: true
        },
    },
    { timestamps: true },
    { collection: 'showData' },
);

const Entry = mongoose.model('Entry', entrySchema);

app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb+srv://admin:admin@cluster0.hhvf1tq.mongodb.net/login');
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

let dataCollection = null;

// retrieve credentials data
const createUsersWithMessages = async () => {
    console.log("Adding data");
    console.log(mongoose.connection.readyState);
    const user1 = new User({
        username: 'iAmAUser',
        password: CryptoJS.AES.encrypt('test', 'secret_key')
    });

    const user2 = new User({
        username: 'iAmAnotherUser',
        password: CryptoJS.AES.encrypt('test2', 'secret_key')
    });

    const entry1 = new Entry({
        show: "Better Call Saul",
        seasons: 6,
        eps: 10,
        duration: 45,
        totalTime: 45.0,
        user: user1.id
    });

    const entry2 = new Entry({
        show: "House of the Dragon",
        seasons: 1,
        eps: 10,
        duration: 60,
        totalTime: 10.0,
        user: user2.id
    });

    const entry3 = new Entry({
        show: "Game of Thrones",
        seasons: 8,
        eps: 10,
        duration: 60,
        totalTime: 80.0,
        user: user2.id
    });

    await entry1.save();
    await entry2.save();
    await entry3.save();

    console.log("Data added");

    await user1.save();
    await user2.save();

    console.log("Users added");
};

const query = async () => {
    Entry.find({ show: "Game of Thrones" }, (err, list) => {
        if (err) return console.log(err);
        console.log(list);
    });
}

// TODO: enable add items
app.post('/submit', express.json(), (req, res) => {
    console.log("Something got submitted to the TV show form");
    req.body.totalTime = ((req.body.seasons * req.body.eps * req.body.duration) / 60).toFixed(2);
    console.log("Request body:");
    console.log(req.body);
    const newEntry = new Entry({
        show: req.body.show,
        seasons: req.body.seasons,
        eps: req.body.eps,
        duration: req.body.duration,
        totalTime: req.body.totalTime,
        user: req.session.username // TODO: implement sessions
    });
    newEntry.save()
        .then(
            res.json(newEntry)
        );
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
    query();
    testBCryptHash();
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
    //console.log(req.body);
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // if the user exists, check the password
    User.find({ username: req.body.username }, async function (err, resultsList) {
        console.log(resultsList);

        if (resultsList.length == 1) { // case where the user is already registered
            let validLogin = false;
            console.log("Comparing " + req.body.password + " to " + resultsList[0].password);

            validLogin = await bcrypt.compare(req.body.password, resultsList[0].password);

            if (validLogin) {
                req.session.login = true;
                req.session.username = req.body.username;
                res.render('main', { msg: 'login successful!', layout: false });
            } else {
                req.session.login = false;
                res.render('index', { msg: 'login failed, please try again', layout: false });
            }
        } else { // case where the user is new, so we just register them
            req.session.login = true;
            req.session.username = req.body.username;
            const newUser = new User({
                username: req.session.username,
                password: hashedPassword
            });
            newUser.save().then(result => res.render('main', { msg: 'login successful!', layout: false }));
        }
    });
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