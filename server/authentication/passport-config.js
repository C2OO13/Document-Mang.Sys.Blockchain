import passportLocal from 'passport-local'

export const initialize = (passport, getUserByEmail) => {
  const authenticateUser = async (email, password, done) => {
    const user = await getUserByEmail(email)
    if (!user) {
      return done(null, false, { message: 'Invalid Credentials!' })
    }
    const user_object = {
      email: user[1],
      name: user[0],
      password: user[2],
    }
    return done(null, user_object)
  }

  passport.use(new passportLocal.Strategy(authenticateUser))
  passport.serializeUser((user, done) => {
    done(null, user.email)
  })

  passport.deserializeUser(async (email, done) => {
    const user = await getUserByEmail(email)
    done(null, {
      email: user[1],
      name: user[0],
      password: user[2],
    })
  })
}
