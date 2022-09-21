const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')

function initialize(passport, getUserByUsername) {
  const authenticateUser = async (username, password, done) => {
    const user = getUserByUsername(username)
    if (user == null) {
      return done(null, false, { message: username+' is not a user!' })
    }

    try {
      if (await bcrypt.compare(password, user.password)) {
        return done(null, user)
      } else {
        return done(null, false, { message: 'password for ' + username + ' is incorrect!' })
      }
    } catch (e) {
      return done(e)
    }
  }

  passport.use(new LocalStrategy(authenticateUser))
  passport.serializeUser(function(user, done) {
    done(null, user)
  })
  
  passport.deserializeUser(function(user, done) {
    done(null, user)
  })
}

module.exports = initialize