import bodyParser from "body-parser";
import cors from 'cors';
import express from 'express';
import mongoose from "mongoose";
import birthCertRoutes from './routes/birthcert.js';
import dotenv from 'dotenv';

const app = express();
dotenv.config();

app.use('/', birthCertRoutes);

app.use(bodyParser.json({
    limit: "30mb",
    extended: true
}));

app.use(bodyParser.urlencoded({
    limit: "30mb",
    extended: true
}));

app.use(cors());

const PORT = process.env.PORT;

mongoose.connect(process.env.CONNECTION_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => app.listen(PORT, () => console.log(`Server connection successful on port: ${PORT}`)))
    .catch((error) => console.log(`Server connection failed with error! ${error.message}`));


