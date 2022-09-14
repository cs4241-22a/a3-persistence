const express = require('express')
const app = express()
const port = 3000

app.use( express.static('public') )

app.use(require('serve-static')(__dirname + '/../../public'));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

var GitHubStrategy = require('passport-github').Strategy;
passport.use(new GitHubStrategy({
        clientID: process.env.github_id,
        clientSecret: process.env.github_secret,
        callbackURL: "http://127.0.0.1:3000/auth/github/callback"
    },
    function(accessToken, refreshToken, profile, cb) {
        User.findOrCreate({ githubId: profile.id }, function (err, user) {
            return cb(err, user);
        });
    }
));

app.listen(port)
