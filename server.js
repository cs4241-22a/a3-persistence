const express = require('express'),
    cookie = require('cookie-session'),
    hbs = require('express-handlebars').engine,
    app = express();

app.use(express.urlencoded({ extended: true }));

app.engine('handlebars', hbs());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.use(express.static(__dirname + "/public")); // serve up static files in the directory public

// app.use(function (req, res, next) { // middleware to always send unauthenticated users to the login page
//     if (req.session && req.session.login) {
//         console.log("user logged in!");
//         next();
//     } else {
//         console.log("nope, not logged in");
//         res.redirect('/public/index.html');
//         return;
//     }
// });

app.use(cookie({ // cookie middleware
    name: 'session',
    keys: ['key1', 'key2'] // TODO: secure these
}));

app.get('/account', function (req, res) {
    if (req.session.login) {
        res.send('Welcome back, ' + req.session.username + '!');
        //res.render( 'main', { msg:'success you have logged in', layout:false })
        res.end();
    } else {
        res.send('Please login to view this page!');
        res.end();
    }
    return;
});

// manage login form requests
app.post('/register', express.json(), (req, res) => {
    if (req.body.password === "test") {
        console.log("Correct password");
        req.session.username = req.body.username;
        req.session.login = true;
        console.log(req.session);
        res.redirect('/public/account.html');
    } else {
        req.session.login = false;
        console.log("Redirecting to index.html");
        res.redirect('/public/index.html');
    }
});

app.listen(3000);