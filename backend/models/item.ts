import mongoose from 'mongoose';

const HolderSchema = new mongoose.Schema({
    address: String,
    city: String,
    postal: String,
}, { _id: false });

const ContactSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: String,
    phone: String,
    preferContact: { 
        type: String, 
        enum: ['email','phone','text'], 
        default: 'phone'
    },
}, { _id: false });

const ImageMetaSchema = new mongoose.Schema({
    filename: String,
    originalname: String,
    mimetype: String,
    size: Number,
    path: String,
    uploadedAt: { 
        type: Date, 
        default: Date.now 
    },
}, { _id: false });

const ItemSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: true 
    },
    description: String,
    category: String,
    dateOccurred: { 
        type: Date, 
        required: true 
    },
    timeOccurred: String,
    location: String,
    isDamaged: { 
        type: Boolean, 
        default: false, 
        required: function(this: any) { return this.status === 'found'; } 
    },
    delivery: {
        possible: { type: Boolean, default: false },
        details: String
    },
    meetup: {
        possible: { type: Boolean, default: false },
        details: String
    },
    reward: { 
        type: String, 
        required: function(this) { return this.status === 'lost' ? false : false; } 
    },
    holder: HolderSchema,
    contact: ContactSchema,
    image: ImageMetaSchema,
    additionalNotes: String,
    status: { 
        type: String, 
        enum: ['found','lost','returned'], 
    },
    createdAt: { type: Date, default: Date.now }
}, { timestamps: true });

ItemSchema.index({ status: 1, location: 'text', createdAt: -1 });

export default mongoose.model('Item', ItemSchema);
