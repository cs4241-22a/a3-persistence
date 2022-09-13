const express = require("express");
const passport = require("passport");
const GithubStrategy = require("passport-github2").Strategy;
const { User } = require("../models");

const router = express.Router();

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(
  new GithubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: "http://127.0.0.1:3000/login/github/callback",
    },
    function (accessToken, refreshToken, profile, cb) {
      User.findOne({ githubId: profile.id }, (err, user) => {
        if (err) {
          return cb(err);
        }
        if (user) {
          return cb(null, user);
        } else {
          const newUser = new User();
          newUser.githubId = profile.id;
          newUser.username = profile.username;
          newUser.save((err) => {
            if (err) {
              throw err;
            }
            return cb(null, newUser);
          });
        }
      });
    }
  )
);

router.get("/login", (req, res) => {
  res.send("login");
});

router.get(
  "/login/github",
  passport.authenticate("github", { scope: ["read:user"] })
);
router.get(
  "/login/github/callback",
  passport.authenticate("github", {
    failureRedirect: "/login",
    failWithError: true,
  }),
  (req, res) => {
    res.redirect("/");
  }
);

module.exports = router;
