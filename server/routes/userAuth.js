import express from 'express';
const router = express.Router();
import { forwardAuthenticated } from '../middlewares/auth/passportAuth.js';

import { login, signup, checkAuth, logout, } from '../controllers/userAuth.js';
import { passportStrategy } from '../middlewares/auth/passportStrategy.js';
// import { signupErrorHandler } from '../middlewares/errorHandler/authErrorHandler.js';

// Login Page
router.get('/login', forwardAuthenticated, (req, res) => res.render('login'));

// Register Page
router.get('/register', forwardAuthenticated, (req, res) => res.render('register'));

router.post('/login', login);
router.post('/signup', signupErrorHandler, signup);
router.get('/check-auth', passportStrategy, checkAuth);
router.get('/logout', passportStrategy, logout);

module.exports = router;