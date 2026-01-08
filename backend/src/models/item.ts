import mongoose, { InferSchemaType } from 'mongoose';

const HolderSchema = new mongoose.Schema({
    address: String,
    state: String,
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
    itemName: { 
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
    reward: { 
        type: Number,
        min: 0,
        default: 0 
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
export type ItemDocument = InferSchemaType<typeof ItemSchema>;
