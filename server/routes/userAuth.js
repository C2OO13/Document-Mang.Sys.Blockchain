import express from 'express'
const router = express.Router()
import { forwardAuthenticated } from '../middlewares/auth/passportAuth.js'
import { login, signup, checkAuth, logout } from '../controllers/userAuth.js'
import { passportStrategy } from '../middlewares/auth/passportStrategy.js'

router.post('/login', passportStrategy, login)
router.post('/signup', passportStrategy, signup)
router.get('/check-auth', checkAuth)
router.get('/logout', passportStrategy, logout)

export default router
