import { config } from 'dotenv'
import bodyParser from 'body-parser'
import cors from 'cors'
import express from 'express'
import passport from 'passport'
import cookieParser from 'cookie-parser'

import certiRoutes from './routes/certis.js'
import authRoutes from './routes/auth.js'

config({ path: './.env' })

const app = express()
const PORT = process.env.PORT || 8000

app.use(express.json())
app.use(cookieParser())

// app.use(
//   bodyParser.json({
//     limit: '30mb',
//     extended: true,
//   })
// )
// app.use(
//   bodyParser.urlencoded({
//     limit: '30mb',
//     extended: true,
//   })
// )
app.use(
  cors({
    credentials: true,
    origin: ['http://localhost:3000'],
  })
)

import './middlewares/auth/passportAuth.js'
app.use(passport.initialize())

// Routes
app.use('/', certiRoutes)
app.use('/', authRoutes)

app.listen(PORT, () => {
  console.log(`Server Listening to Port: ${PORT}`)
})
