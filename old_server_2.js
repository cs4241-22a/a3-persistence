const express = require('express'),
    cookie = require('cookie-session'),
    hbs = require('express-handlebars').engine,
    app = express();

app.use(express.urlencoded({ extended: true }));

app.engine('handlebars', hbs());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.use(express.static(__dirname + "/public")); // serve up static files in the directory public

app.use(cookie({ // cookie middleware
    name: 'session',
    keys: ['key1', 'key2'] // TODO: secure these
}));

// add some middleware that always sends unauthenicaetd users to the login page
app.use(function (req, res, next) {
    if (req.session.login === true) {
        next();
    } else {
        res.render('index', { msg: 'login failed, please try again', layout: false });
    }
});

app.get('/account', function (req, res) {
    if (req.session.login) {
        console.log("Logged in");
        res.render('main', { msg: 'success you have logged in', layout: false })
        res.end();
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
        req.session.username = req.body.username;
        req.session.login = true;
        res.render('main', { msg: 'login successful!' });
    } else {
        req.session.login = false;
        res.render('index', { msg: 'login failed, please try again', layout: false });
    }
});

app.listen(3000);