import bodyParser from "body-parser";
import cors from 'cors';
import express from 'express';
import mongoose from "mongoose";

const app = express();

app.use(bodyParser.json({
    limit: "30mb",
    extended: true
}));

app.use(bodyParser.urlencoded({
    limit: "30mb",
    extended: true
}));

app.use(cors());     

//MongoDB Cloud Atlas connection url
const CONNECTION_URL = "";

const PORT = env.process.PORT || 5000;



