import 'dotenv/config';
import express from 'express';
import './config/dataBase';
import cors from 'cors';
import path from 'path';

import ItemsRouter from './routes/items';
import userRouter from './routes/user';

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

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api', ItemsRouter);

app.use('/api', userRouter);

const PORT = process.env.PORT || 5000;

app.get('/api/health', (req, res) => {
  res.send('API is running on port ' + PORT +'...');
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

