import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import mongoose from 'mongoose';
import router from './router';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(cors({
    credentials: true,
}));

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}/`);
});

// Select the correct MongoDB URL based on the environment
const DATABASE_URL =
    process.env.MODE === 'PROD'
        ? process.env.ONLINE_URL
        : process.env.LOCAL_URL;
console.log('MODE:', process.env.MODE);
console.log('DATABASE_URL:', process.env.MODE === 'PROD' ? process.env.ONLINE_URL : process.env.LOCAL_URL);


mongoose.Promise = Promise;

// Connect to MongoDB using the latest options
mongoose.connect(DATABASE_URL as string)
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.error('MongoDB connection error:', error));


app.use('/', router());
