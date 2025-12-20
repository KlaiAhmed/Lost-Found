import 'dotenv/config';
import express from 'express';
import './config/dataBase';
import cors from 'cors';
import path from 'path';

import foundItemsRouter from './routes/items';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api', foundItemsRouter);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

