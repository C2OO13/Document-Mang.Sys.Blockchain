import express from 'express';
import { ensureAuthenticated, forwardAuthenticated } from '../middlewares/auth/passportAuth.js';
const router = express.Router();

// Initial Page
// router.get('/', forwardAuthenticated, (req, res) => res.render(''));

// Dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) =>
  res.render('dashboard', {
    user: req.user
  })
);

export default router;