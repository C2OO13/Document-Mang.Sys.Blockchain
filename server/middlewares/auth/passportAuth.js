import StatusCodes from 'http-status-codes'

export const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next()
  }
  // Send Error Message
  res
    .status(StatusCodes.CONFLICT)
    .json({ error: `Please Login To See The Resource!!!` })
  res.redirect('/api/login')
}

export const forwardAuthenticated = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return next()
  }
  res.redirect('/dashboard')
}
