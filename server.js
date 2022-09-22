const express = require('express'),
    mongoose = require('mongoose'),
    cookie = require('cookie-session'),
    hbs = require('express-handlebars').engine,
    app = express();

const bcrypt = require('bcrypt');
app.engine('handlebars', hbs());
app.set('view engine', 'handlebars');
app.set('views', './views');

//require('mongoose-double')(mongoose);

app.use(express.json());
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
            type: Number,
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

entrySchema.index({ show: 1, user: 1 }, { unique: true });

const Entry = mongoose.model('Entry', entrySchema);

// Database connections
mongoose.connect('mongodb+srv://admin:admin@cluster0.hhvf1tq.mongodb.net/login');
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// helper function used by the add, remove, modify routes
const queryUsernameToId = async (userLookup) => {
    const user = await User.findOne({ username: userLookup });
    return user.id;
}

const queryUsernameToShows = async (userLookup) => {
    const userId = await queryUsernameToId(userLookup);
    const docs = await Entry.find({ user: userId }, "_id show seasons eps duration totalTime user");
    return docs;
}

app.get('/', (req, res) => {
    res.render('index', { layout: false });
});

app.post('/getdata', async (req, res) => {
    if (req.session.login) {
        const data = await queryUsernameToShows(req.session.username);
        if (data.length == 0) {
            res.end();
        } else {
            res.json(data).end();
        }
    } else {
        res.end();
    }
});

app.post('/submit', async (req, res) => {
    const userId = await queryUsernameToId(req.session.username);
    const docs = await Entry.find({ show: req.body.show, user: userId });
    if (docs.length > 0) {
        res.json({ msg: "Cannot enter two shows with the same information. Either modify the existing show or delete it altogether." });
    } else {
        const newEntry = new Entry({
            show: req.body.show,
            seasons: req.body.seasons,
            eps: req.body.eps,
            duration: req.body.duration,
            totalTime: parseInt((req.body.seasons * req.body.eps * req.body.duration) / 60),
            user: userId
        });
        const entry = await newEntry.save();
        res.json(await queryUsernameToShows(req.session.username)).end();
    }
});

app.post('/remove', async (req, res) => {
    const userId = await queryUsernameToId(req.session.username);
    Entry.deleteOne({ show: req.body.show, user: userId }).then(() => {
        console.log("Successfully deleted");
    }).catch((error) => {
        console.log(error); // Failure
    });
    res.json(await queryUsernameToShows(req.session.username)).end();
});

app.patch('/update', async (req, res) => {
    const userId = await queryUsernameToId(req.session.username);
    const mins = req.body.seasons * req.body.eps * req.body.duration;
    let doc = await Entry.findOneAndUpdate({ _id: req.body.id }, { show: req.body.show, seasons: req.body.seasons, eps: req.body.eps, duration: req.body.duration, totalTime: parseInt(mins / 60) });
    const data = await queryUsernameToShows(req.session.username);
    if (data.length == 0) {
        res.end();
    } else {
        res.json(data).end();
    }
});

app.get('/account', async (req, res) => {
    if (req.session.login) {
        let tempString = "Welcome, " + req.session.username + "!";
        res.render('main', { msg: tempString, layout: false });
    } else {
        res.send('Invalid login credentials, please try again');
        res.end();
    }
    return;
});

// manage login form requests
app.post('/register', async (req, res) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    User.find({ username: req.body.username }, async (err, resultsList) => { // if the user exists, check the password
        if (resultsList.length == 1) { // case where the user is already registered
            let validLogin = false;
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

app.post('/logout', (req, res) => {
    if (req.session.login) {
        req.session.username = "";
        req.session.login = false;
        res.redirect('index');
    }
});

app.listen(3000);