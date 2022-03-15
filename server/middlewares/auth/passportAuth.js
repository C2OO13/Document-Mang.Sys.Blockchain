import StatusCodes from 'http-status-codes';

export const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  // Send Error Message
  return res
    .status(StatusCodes.CONFLICT)
    .json({ error: `Please Login To See The Resource!!!`});
  res.redirect('/users/login');
};

export const forwardAuthenticated = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return next();
  }
  res.redirect('/dashboard');      
};
