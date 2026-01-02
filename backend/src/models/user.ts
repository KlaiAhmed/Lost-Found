import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: { 
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    LastLogin: { 
        type: Date,
        default: Date.now 
    },
    failedLoginAttempts: { 
        type: Number, 
        default: 0 
    },
    hashedRefreshToken: { 
        type: String,
    },
    lockUntil: { 
        type: Date ,
        default: null
    }
}, { timestamps: true });

export const User = mongoose.model('User', UserSchema);