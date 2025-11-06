import express from 'express';
import cors from 'cors';
import { env } from './config/env.js';
import apiRouter from './api/routes.js';
import { errorConverter, errorHandler, notFound } from './middleware/error.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API
app.use('/api', apiRouter);

// 404 + error handlers
app.use(notFound);
app.use(errorConverter);
app.use(errorHandler);

export default app;
