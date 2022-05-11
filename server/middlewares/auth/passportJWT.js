import passport from 'passport'
import { StatusCodes } from 'http-status-codes'

export const passportJWT = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user) => {
    if (err) {
      console.log(err)
      return next(err)
    }
    console.log(user)
    if (!user)
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ error: 'Unauthorized user' })
    req.user = user
    next()
  })(req, res, next)
}
