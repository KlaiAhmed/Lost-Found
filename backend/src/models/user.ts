import mongoose from 'mongoose';
import DeviceInfo from './deviceInfo';

const SessionSchema = new mongoose.Schema(
  {
    sessionId: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    refreshjwtidHash: {
      type: String,
      required: true,
    },
    expiresAt: {
      type: Date,
      required: true,
      index: { expireAfterSeconds: 0 },
    },
    deviceInfo: {
      type: DeviceInfo,
      required: true,
    },
    rememberMe: {
      type: Boolean,
      default: false,
    },
  },
  { _id: false }
);

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      index: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    lastLogin: {
      type: Date,
    },
    failedLoginAttempts: {
      type: Number,
      default: 0,
    },
    lockUntil: {
      type: Date,
    },
    sessions: {
      type: [SessionSchema],
      default: [],
    },
  },
  { timestamps: true }
);

export const User = mongoose.model('User', UserSchema);
