const passport = require("passport");
const GithubStrategy = require("passport-github2").Strategy;
const keys = require("./keys");
const client = require("./mongodbSetUp");
const mongo = require("mongodb");
var session = require("express-session");
const db = client.db(keys.database.database);
const collection = db.collection(keys.database.c_u);

passport.serializeUser((user, done) => {
    done(null, user._id);
});

//it create a new mongo object id and tries to find the user with the same id. If it does find the one with the 
// same object id in the database it returns the user with the userinfo to 
passport.deserializeUser((id, done) => {
    let o_id = new mongo.ObjectId(id);
    collection.findOne({ _id: o_id }).then((user) => {
      done(null, user);
    });
});
  
passport.use(new GithubStrategy(
      { //option for github strategy
        // we need the client id and client secret to access the github API
        callbackURL: "/auth/github/redirect",
        clientID: keys.github.clientID,
        clientSecret: keys.github.clientSecret,
      },
      (accessToken, refreshToken, profile, done) => {   //passport callback functionS
        collection.findOne({ github_id: profile.id }).then((result) => {
          if (result) {
            console.log("user is: ", result.username);
            console.log("user id is: ", result._id);
            done(null, result);
          } else {
            const username = profile.username;
            const github_id = profile.id;
            collection
              .insertOne({ username: username, github_id: github_id })
              .then((newUser) => {
                newUser._id = newUser.insertedId;
                console.log("New User created:", newUser);
                done(null, newUser);
              });
          }
        });
      }
    )
);
  