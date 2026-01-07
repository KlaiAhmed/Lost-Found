import 'dotenv/config';
import express from 'express';
import './config/dataBase';
import cors from 'cors';
import path from 'path';

import ItemsRouter from './routes/items';
import userRouter from './routes/user';

import cookieParser from 'cookie-parser';

import { UPLOAD_ROOT } from './middlewares/uploadImg';

const app = express();

app.use(cors(
  {
    origin: process.env.Client_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-CSRF-Token'],
    credentials: true
  }
));

app.use(express.json());

app.use(cookieParser());

app.use('/uploads', express.static(path.join(UPLOAD_ROOT)));

app.use('/api', ItemsRouter);

app.use('/api', userRouter);

const PORT = process.env.PORT || 5000;

app.get('/api/health', (req, res) => {
  res.send('API is running on port ' + PORT +'...');
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

