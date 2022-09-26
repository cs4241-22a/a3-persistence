const LocalStrategy = require('passport-local').Strategy


function initialize(passport, getUser, getUserById) {
    const auth = (username,password,done) => {
        const user = getUser(username)
        if(user == null){
            return done(null, false, {message: "Username not found"})
        }

        try {
            if(user.password === password){
                return done(null, user)
            } else {
                return done(null, false, {message: "Wrong password"})
            }
        }
        catch (e){
            return done(e)
        }
    }

    passport.use(new LocalStrategy({ usernameField: 'username' }, auth))
    passport.serializeUser((user, done) => done(null, user.id))
    passport.deserializeUser((id, done) => done(null, getUserById(id)))
}

module.exports = initialize