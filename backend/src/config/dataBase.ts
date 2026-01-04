import mongoose from 'mongoose';

const mongoURI= process.env.MONGO_URI || 'mongodb://localhost:27017/mydatabase';

mongoose.connect(mongoURI)
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch(err => {
    console.error('Mongo connection error', err);
  });

