import mongoose from 'mongoose';

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/lost&found')
    .then(() => { console.log('Connected to MongoDB'); })
    .catch((err) => { console.error('Error connecting to MongoDB:', err); });

