import express from 'express';
const router = express.Router();
import { forwardAuthenticated } from '../middlewares/auth/passportAuth.js';
import { login, signup, checkAuth, logout, } from '../controllers/userAuth.js';
import { passportStrategy } from '../middlewares/auth/passportStrategy.js';

// Login Page
router.get('/login', forwardAuthenticated, (req, res) => res.render('login'));

// Register Page
router.get('/register', forwardAuthenticated, (req, res) => res.render('register'));

router.post('/login', passportStrategy, login);
router.post('/signup', passportStrategy, signup);
router.get('/check-auth', checkAuth);
router.get('/logout', passportStrategy, logout);

export default router;