import { config } from 'dotenv';
import bodyParser from "body-parser";
import cors from 'cors';
import express from 'express';
import passport from 'passport';
import session from 'express-session';
import { ensureAuthenticated, forwardAuthenticated } from './middlewares/auth/passportAuth.js';
import routes from './routes/index.js';
// import errorHandler from '../middlewares/errorHandler'     
// import mongoose from "mongoose";
import birthCertRoutes from './routes/birthcert.js';

// Configure .env file, for environment variables
config({ path: './.env' });

// Starting The Express.js Server
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

// // ErrorHandler middleware
// app.use(errorHandler.notFound);
// app.use(errorHandler.errorHandler);

// Start Session
app.use(
    session({
      secret: 'secret',
      resave: true,
      saveUninitialized: true
    })
  );
  
// Authentication Middleware
app.use(passport.initialize());
app.use(passport.session());
  
// Routes
app.use('/', routes)

// Initial Page
app.get('/', (req, res) => {
    res.render("Hello BBDMS")
});

app.use('/', birthCertRoutes);

/*

mongoose.connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server connection successful on port: ${PORT}`)))
    .catch((error) => console.log(`Server connection failed with error! ${error.message}`));
*/

app.listen(PORT, () => {
    console.log(`Server Listening to Port: ${PORT}`);
});