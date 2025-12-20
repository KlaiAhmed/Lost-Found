import mongoose from 'mongoose';
import express from 'express';

const app = express();
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI || '')
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch(err => {
    console.error('Mongo connection error', err);
  });

