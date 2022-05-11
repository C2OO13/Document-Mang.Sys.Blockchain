import passport from 'passport'
import { Strategy } from 'passport-jwt'

import { getUserByEmail } from '../../blockchain/methods.js'

console.log('Logs')

passport.use(
  'jwt',
  new Strategy(
    {
      jwtFromRequest: (req) => {
        let token = null
        if (req && req.cookies) token = req.cookies.jwt
        return token
      },
      secretOrKey: process.env.JWT_TOKEN_SECRET,
    },
    async (payload, done) => {
      console.log('aksjcn')
      try {
        const user = await getUserByEmail(payload.email)
        if (user) {
          const user_object = {
            name: user[0],
            email: user[1],
            password: user[2],
          }

          return done(null, user_object)
        } else {
          return done(null, false)
        }
      } catch (err) {
        return done(err, false)
      }
    }
  )
)

passport.serializeUser(function (user, done) {
  done(null, user.email)
})
passport.deserializeUser(function (obj, done) {
  done(null, obj)
})
