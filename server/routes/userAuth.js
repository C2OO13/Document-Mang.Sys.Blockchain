const express = require('express');
const router = express.Router();
const { forwardAuthenticated } = require('../middlewares/passportAuth');

const {
  login,
  signup,
  checkAuth,
  logout,
} = require('../controllers/userAuth');
const passportStrategy = require('../middlewares/auth/passportStrategy');
const {
  signupErrorHandler,
} = require('../middlewares/errorHandler/authErrorHandler');

// Login Page
router.get('/login', forwardAuthenticated, (req, res) => res.render('login'));

// Register Page
router.get('/register', forwardAuthenticated, (req, res) => res.render('register'));

router.post('/login', login);
router.post('/signup', signupErrorHandler, signup);
router.get('/check-auth', passportStrategy, checkAuth);
router.get('/logout', passportStrategy, logout);

module.exports = router;