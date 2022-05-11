import express from 'express'
const router = express.Router()
import {
  login,
  signup,
  checkAuth,
  logout,
} from '../controllers/authcontroller.js'

import { passportJWT } from '../middlewares/auth/passportJWT.js'

router.post('/api/login', login)
router.post('/api/signup', signup)
router.get('/api/check_auth', passportJWT, checkAuth)
router.get('/api/logout', passportJWT, logout)

export default router
