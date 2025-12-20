import mongoose from 'mongoose';

const HolderSchema = new mongoose.Schema({
  address: { type: String },
  city: String,
  postal: String,
});

const ContactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: String,
  phone: String,
  preferContact: { type: String, enum: ['email','phone','text'], default: 'phone' },
});

const ImageMetaSchema = new mongoose.Schema({
  filename: String,
  originalname: String,
  mimetype: String,
  size: Number,
  path: String,
  uploadedAt: { type: Date, default: Date.now },
});

const FoundItemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  category: String,
  dateFound: { type: Date },
  timeFound: String,
  foundLocation: String,
  isDamaged: { type: Boolean, default: false },
  holder: HolderSchema,
  contact: ContactSchema,
  delivery: {
    possible: { type: Boolean, default: false },
    details: String
  },
  meetup: {
    possible: { type: Boolean, default: false },
    details: String
  },
  image: ImageMetaSchema,
  additionalNotes: String,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('FoundItem', FoundItemSchema);
