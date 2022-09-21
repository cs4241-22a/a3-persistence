const express = require("express");
const passport = require("passport");
const GithubStrategy = require("passport-github2").Strategy;
const { User } = require("../models");
const router = express.Router();

passport.serializeUser((user, cb) => {
  cb(null, user.github_id);
});

passport.deserializeUser((id, cb) => {
  cb(null, id);
});

passport.use(
  new GithubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    },
    function (accessToken, refreshToken, profile, cb) {
      User.findOne({ github_id: profile.id }, (err, user) => {
        if (err) {
          return cb(err);
        }

        if (user) {
          return cb(null, user);
        } else {
          const newUser = new User();
          newUser.github_id = profile.id;
          newUser.username = profile.username;

          newUser.save((err) => {
            return err ? cb(err) : cb(null, newUser);
          });
        }
      });
    }
  )
);

router.get("/auth/github", passport.authenticate("github"));

router.get(
  "/auth/github/callback",
  passport.authenticate("github", {
    failureRedirect: "/login",
    failWithError: true,
  }),
  (req, res) => {
    res.redirect("/");
  }
);

router.use("/", express.static("app/views/login"));

const checkAuthentication = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
};

module.exports = { router, checkAuthentication };
