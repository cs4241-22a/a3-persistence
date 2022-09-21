// 1. Fix add route
// 2. Fix remove route
// 3. Implement modification frontend
// 4. Write modification route

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

app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public")); // serve up static files in the directory public

app.use(cookie({
    name: 'session',
    keys: ['key1', 'key2']
}));

// Mongoose schema definitions
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
    }
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
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
    },
    { timestamps: true }
);

const Entry = mongoose.model('Entry', entrySchema);

// Database connections
mongoose.connect('mongodb+srv://admin:admin@cluster0.hhvf1tq.mongodb.net/login');
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// set up initial credentials data
const createUsersWithMessages = async () => {
    console.log("Adding data");
    console.log(mongoose.connection.readyState);

    const user1 = new User({
        username: 'iAmAUser',
        password: 'test',
    });

    const user2 = new User({
        username: 'iAmAnotherUser',
        password: 'test',
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
        user: user1.id
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

// helper function used by the add, remove, modify routes
const queryUsernameToId = async function(userLookup) {
    const user = await User.findOne({ username: userLookup });
    return user.id;
}

app.post('/submit', express.json(), async (req, res) => {
    console.log("Received request to enter show " + req.body.show + " under name " + req.session.username);
    const userId = await queryUsernameToId(req.session.username);
    const newEntry = new Entry({
        show: req.body.show,
        seasons: req.body.seasons,
        eps: req.body.eps,
        duration: req.body.duration,
        totalTime: ((req.body.seasons * req.body.eps * req.body.duration) / 60).toFixed(2),
        user: userId
    });
    newEntry.save().then(res.status(200).json(newEntry));
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
    // createUsersWithMessages();
    res.render('index', { layout: false });
});

app.get('/account', function (req, res) {
    if (req.session.login) {
        console.log("Logged in");
        let tempString = "Welcome, " + req.session.username + "!";
        res.render('main', { msg: tempString, layout: false });
        // TODO: need to add a place in the view for the table ???
        // actually no, because I have code in the frontend that turns the JSON into a pretty table
        // just make a function to send + update the JSON data properly
    } else {
        res.send('Invalid login credentials, please try again');
        res.end();
    }
    return;
});

// manage login form requests
app.post('/register', express.json(), async (req, res) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    User.find({ username: req.body.username }, async function (err, resultsList) { // if the user exists, check the password
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

app.post('/logout', express.json(), (req, res) => {
    console.log("Login status:");
    console.log(req.session.login);
    if (req.session.login) {
        console.log("Re-rendering");
        res.render('index', { msg: 'logout successful!', layout: false });
        req.session.username = "";
        req.session.login = false;
    }
});

app.listen(3000);