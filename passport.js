const passport = require('passport'),
    GitHubStrategy = require('passport-github2').Strategy

passport.serializeUser((user, done) => {
    done(null, user)
})

passport.deserializeUser((user, done) => {
    done(null, user)
})

// noinspection JSCheckFunctionSignatures
passport.use( new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: `http://localhost:${process.env.PORT}/auth/github/callback`
}, (accessToken, refreshToken, profile, done) => {
    return done(null, profile);
}))