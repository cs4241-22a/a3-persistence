const express = require("express");
const passport = require("passport");
const GithubStrategy = require("passport-github2").Strategy;

passport.use(
  new GithubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: "http://127.0.0.1:3000/task",
    },
    function (accessToken, refreshToken, profile, done) {
      User.findOne({ githubId: profile.id }, (err, user) => {
        return done(err, user);
      });
    }
  )
);
