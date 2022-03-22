import express from 'express';

import mongoose from 'mongoose';
import routes from './routes/index.js';
import cookieParser from 'cookie-parser';
import models from './models/index.js';
import cors from 'cors';
import bodyParser from 'body-parser';

import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.options('*', cors()); // enable pre-flight
app.use(bodyParser.json());
mongoose.connect(process.env.MONGO_URI);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

routes(app);

export default app;
