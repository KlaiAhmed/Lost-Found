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

const lostItemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  category: String,
  dateLost: { type: Date },
  timeLost: String,
  lostLocation: String,
  holder: HolderSchema,
  contact: ContactSchema,
  image: ImageMetaSchema,
  reward: String,
  additionalNotes: String,
  status: { type: String, enum: ['found','lost','claimed','returned'], default: 'lost' },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('LostItem', lostItemSchema);