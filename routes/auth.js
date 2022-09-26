var express = require('express');
var passport = require('passport');
var FacebookStrategy = require('passport-github');
var db = require('../db');
const User = require('../models/User');

// passport.use(new FacebookStrategy({
//   clientID: 'd0a65adde69becb6a6e7',
//   clientSecret: '413a9e09e63ed43b76e87da988451361f948322a',
//   callbackURL: "/oauth2/redirect/github"
// },
// function(accessToken, refreshToken, profile, cb) {
//   findOrCreateUser({ facebookId: profile.id }, function (err, user) {
//     return cb(err, user);
//   });
// }
// ));

// function findOrCreateUser() {
//   // post to db using User model
// }

passport.use(new FacebookStrategy({
  clientID: 'd0a65adde69becb6a6e7',
  clientSecret: '413a9e09e63ed43b76e87da988451361f948322a',
  callbackURL: '/oauth2/redirect/github',
  state: true
}, function verify(accessToken, refreshToken, profile, cb) {
  db.get('SELECT * FROM federated_credentials WHERE provider = ? AND subject = ?', [
    'https://www.github.com/',
    profile.id
  ], function(err, row) {
    if (err) { return cb(err); }
    if (!row) {
      db.run('INSERT INTO users (name) VALUES (?)', [
        profile.displayName
      ], function(err) {
        if (err) { return cb(err); }
        var id = this.lastID;
        db.run('INSERT INTO federated_credentials (user_id, provider, subject) VALUES (?, ?, ?)', [
          id,
          'https://www.github.com',
          profile.id
        ], function(err) {
          if (err) { return cb(err); }
          var user = {
            id: id,
            name: profile.displayName
          };
          return cb(null, user);
        });
      });
    } else {
      db.get('SELECT * FROM users WHERE id = ?', [ row.user_id ], function(err, row) {
        if (err) { return cb(err); }
        if (!row) { return cb(null, false); }
        return cb(null, row);
      });
    }
  });
}));

passport.serializeUser(function(user, cb) {
  process.nextTick(function() {
    cb(null, { id: user.id, username: user.username, name: user.name });
  });
});

passport.deserializeUser(function(user, cb) {
  process.nextTick(function() {
    return cb(null, user);
  });
});


var router = express.Router();

router.get('/login', function(req, res, next) {
  res.render('login');
});

router.get('/login/federated/github', passport.authenticate('github'));

router.get('/oauth2/redirect/github', passport.authenticate('github', {
  successReturnToOrRedirect: '/',
  failureRedirect: '/login'
}));

router.post('/logout', function(req, res, next) {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

module.exports = router;
