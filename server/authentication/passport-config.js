import passportLocal from 'passport-local'

import { login } from '../blockchain/methods.js'

export const initialize = (passport, getUserByEmail) => {
  const authenticateUser = (email, password, done) => {
    const user = login(email, password)
    if (!user) {
      return done(null, false, { message: 'Invalid Credentials!' })
    }
    return done(null, user)
  }

  passport.use(
    new passportLocal.Strategy({ usernameField: 'email' }, authenticateUser)
  )
  passport.serializeUser((user, done) => done(null, user.email))
  passport.deserializeUser((email, done) => {
    return done(null, getUserByEmail(email))
  })
}
