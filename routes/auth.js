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
      callbackURL: process.env.ENV == "prd" ? "https://baseball.axbolduc.com/login/github/callback" : "http://127.0.0.1:3000/login/github/callback",
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

router.get(
  "/github",
  passport.authenticate("github", { scope: ["read:user"] })
);
router.get(
  "/github/callback",
  passport.authenticate("github", {
    failureRedirect: "/login",
    failWithError: true,
  }),
  (req, res) => {
    res.redirect("/");
  }
);

router.use("/", express.static("public/login"));

const requireAuth = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}


module.exports = {router, requireAuth};
