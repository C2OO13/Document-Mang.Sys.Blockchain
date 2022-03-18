import { config } from 'dotenv';
import bodyParser from "body-parser";
import cors from 'cors';
import express from 'express';
import passport from 'passport';
import session from 'express-session';
import routes from './routes/index.js';
import certiRoutes from './routes/certis.js';
import loginroutes from './routes/userAuth.js';
import flash from 'express-flash'
config({ path: './.env' });

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json({
    limit: "30mb",
    extended: true
}));
app.use(bodyParser.urlencoded({
    limit: "30mb",
    extended: true
}));
app.use(cors());

// Start Session
app.use(
    session({
        secret: 'secret',
        resave: true,
        saveUninitialized: true
    })
);

// Authentication Middleware
import './middlewares/auth/passportStrategy.js'
app.use(passport.initialize());
app.use(passport.session());
app.use(flash())
// Routes
app.use('/', routes)
app.use('/', loginroutes)

// Initial Page
app.get('/', (req, res) => {
    res.send("Hello BBDMS")
});

app.use('/', certiRoutes);

app.listen(PORT, () => {
    console.log(`Server Listening to Port: ${PORT}`);
});