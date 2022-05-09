const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')

const { login } = require('../blockchain/methods')

const initialize = (passport, getUserByEmail) => {
  const authenticateUser = (email, password, done) => {
    const user = login(email, password)
    if (!user) {
      return done(null, false, { message: 'Invalid Credentials!' })
    }
    return done(null, user)
  }

  passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser))
  passport.serializeUser((user, done) => done(null, user.email))
  passport.deserializeUser((email, done) => {
    return done(null, getUserByEmail(email))
  })
}

module.exports = initialize
