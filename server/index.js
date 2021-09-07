import bodyParser from "body-parser";
import cors from 'cors';
import express from 'express';
import mongoose from "mongoose";
import postRoutes from './routes/posts.js';

const app = express();


app.use('/', postRoutes);

app.use(bodyParser.json({
    limit: "30mb",
    extended: true
}));

app.use(bodyParser.urlencoded({
    limit: "30mb",
    extended: true
}));

app.use(cors());

const CONNECTION_URL = "mongodb+srv://admin:admin@mycluster.edhcu.mongodb.net/mydb?retryWrites=true&w=majority";
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => app.listen(PORT, () => console.log(`Server connection successful on port: ${PORT}`)))
    .catch((error) => console.log(`Server connection failed with error! ${error.message}`));


