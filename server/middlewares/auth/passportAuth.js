import StatusCodes from 'http-status-codes';

export const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  // Send Error Message
  res
    .status(StatusCodes.CONFLICT)
    .json({ error: `Please Login To See The Resource!!!`});
  console.log("ensure authen". req.body)
  res.redirect('/api/login');
};

export const forwardAuthenticated = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return next();
  }
  res.redirect('/dashboard');      
};