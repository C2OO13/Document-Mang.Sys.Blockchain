import { config } from 'dotenv'
import bodyParser from 'body-parser'
import cors from 'cors'
import express from 'express'
import passport from 'passport'
import session from 'express-session'
import certiRoutes from './routes/certis.js'
import { getUserByEmail } from './blockchain/methods'

config({ path: './.env' })

import initializePassport from './authentication/passport-config'
initializePassport(passport, getUserByEmail)

const app = express()
const PORT = process.env.PORT || 5000

app.use(
  bodyParser.json({
    limit: '30mb',
    extended: true,
  })
)
app.use(
  bodyParser.urlencoded({
    limit: '30mb',
    extended: true,
  })
)
app.use(cors())

// Start Session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
  })
)

app.use(passport.initialize())
app.use(passport.session())

// Routes
app.use('/', certiRoutes)

app.listen(PORT, () => {
  console.log(`Server Listening to Port: ${PORT}`)
})
