import { User } from "../models/user";
import bcrypt from 'bcryptjs';

const getUserData = async (userId: string) => {
  const user = await User.findById(userId);
  if (!user) {
    return { success: false, message: 'User not found' };
  }

  return {
    id: user._id.toString(),
    username: user.username,
    email: user.email,
    role: user.role,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
};

const updateUserData = async (userId: string, currentPassword: string, updates: any) => {
  const userRecord = await User.findById(userId).select('+password');
  if (!userRecord) {
    return { success: false, message: 'User not found' };
  }

  const isPasswordValid = await bcrypt.compare(currentPassword,userRecord.password);
  if (!isPasswordValid) {
    return { success: false, message: 'Current password is incorrect' };
  }

  if (updates.password) {
    updates.password = await bcrypt.hash(updates.password, Number(process.env.BCRYPT_SALT_ROUNDS) || 10);
  }

  const user = await User.findByIdAndUpdate(userId,{ $set: updates },{ new: true });

  if (!user) {
    return { success: false, message: 'User not found' };
  }

  return {
    id: user._id.toString(),
    username: user.username,
    email: user.email,
    role: user.role,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
};


export { getUserData, updateUserData };