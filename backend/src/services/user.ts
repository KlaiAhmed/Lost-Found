import { Request, Response } from 'express';
import { User } from '../models/user';
import bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { v4 as uuid } from 'uuid';
import getDeviceInfo from '../utils/deviceInfo';
/* ------------------------------------------------------------------ */
/* Config */
/* ------------------------------------------------------------------ */

const JWT_SECRET = process.env.JWT_SECRET as string;
const JWT_ACCESS_EXPIRES = process.env.JWT_ACCESS_EXPIRES as string;
const JWT_REFRESH_EXPIRES_DEFAULT = process.env.JWT_REFRESH_EXPIRES_DEFAULT as string;
const JWT_REFRESH_EXPIRES_REMEMBER = process.env.JWT_REFRESH_EXPIRES_REMEMBER as string;
const BCRYPT_SALT_ROUNDS = Number(process.env.BCRYPT_SALT_ROUNDS) || 10;
const MAX_SESSIONS = Number(process.env.MAX_SESSIONS) || 5;

if (!JWT_SECRET||!JWT_ACCESS_EXPIRES||!JWT_REFRESH_EXPIRES_DEFAULT||!JWT_REFRESH_EXPIRES_REMEMBER) {
  throw new Error('Environment variables are not properly defined.');
}

/* ------------------------------------------------------------------ */
/* Types */
/* ------------------------------------------------------------------ */

type LoginParams = {
  email: string;
  password: string;
  rememberMe?: boolean;
  userAgent: string;
  existingSessionId?: string;
};

type RegisterParams = {
  username: string;
  email: string;
  password: string;
};

type RefreshPayload = { 
  sub: string; 
  jwtid: string 
};


/* ------------------------------------------------------------------ */
/* Token helpers */
/* ------------------------------------------------------------------ */

const generateAccessToken = ( userId:any, username: string, role: string ) => {
  return jwt.sign({ sub: userId.toString(), username, role },JWT_SECRET,{ expiresIn: JWT_ACCESS_EXPIRES  });
};

const generateRefreshToken = (userId: string,jwtid: string,rememberMe: boolean) => {
  return jwt.sign({ sub: userId, jwtid },JWT_SECRET,
    {expiresIn: rememberMe? JWT_REFRESH_EXPIRES_REMEMBER : JWT_REFRESH_EXPIRES_DEFAULT}
  );
};

/* ------------------------------------------------------------------ */
/* Register */
/* ------------------------------------------------------------------ */

const registerUserService = async ({username,email,password}: RegisterParams) => {
  const existing = await User.exists({ email });
  if (existing) {
    return { success: false, message: 'User already exists' };
  }

  const hashedPassword = await bcrypt.hash(password,BCRYPT_SALT_ROUNDS);

  await User.create({ username, email, password: hashedPassword });

  return { success: true };
};

/* ------------------------------------------------------------------ */
/* Login */
/* ------------------------------------------------------------------ */

const loginUserService = async ({email,password,rememberMe = false,userAgent,existingSessionId,}: LoginParams) => {
  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    return { success: false, message: 'Invalid credentials' };
  }

  if (user.lockUntil && user.lockUntil > new Date()) {
    return { success: false, message: 'Account locked. Try again later.' };
  }

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    user.failedLoginAttempts += 1;

    if (user.failedLoginAttempts >= 5) {
      user.lockUntil = new Date(Date.now() + 2 * 60 * 60 * 1000);
    }

    await user.save();
    return { success: false, message: 'Invalid credentials' };
  }

  user.failedLoginAttempts = 0;
  user.lockUntil = undefined;
  user.lastLogin = new Date();

  const sessionId = existingSessionId || uuid();
  const refreshJwtId = uuid();

  user.sessions.pull({ sessionId });

  user.sessions.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());

  while (user.sessions.length >= MAX_SESSIONS) {
    user.sessions.shift();
  }

  user.sessions.push({
    sessionId,
    refreshjwtidHash: await bcrypt.hash(refreshJwtId, BCRYPT_SALT_ROUNDS),
    deviceInfo: getDeviceInfo(userAgent),
    rememberMe,
  });

  await user.save();

  return {
    success: true,
    data: {
      accessToken: generateAccessToken(user._id, user.username, user.role),
      refreshToken: generateRefreshToken(
        user._id.toString(),
        refreshJwtId,
        rememberMe
      ),
      sessionId,
    },
  };
};

/* ------------------------------------------------------------------ */
/* Refresh token */
/* ------------------------------------------------------------------ */

const refreshTokenService = async ( refreshToken: string , sessionId: string) => {
  try {
    if (!refreshToken || !sessionId) {
      return { success: false };
    }

    const payload = jwt.verify(refreshToken,JWT_SECRET) as RefreshPayload;

    const user = await User.findOne({ _id: payload.sub, 'sessions.sessionId': sessionId,});

    if (!user) {
      return { success: false };
    }

    const session = user.sessions.find((s) => s.sessionId === sessionId);
    if (!session) {
      return { success: false };
    }

    const isValid = await bcrypt.compare(
      payload.jwtid,
      session.refreshjwtidHash
    );

    if (!isValid) {
      user.sessions.splice(0, user.sessions.length);
      await user.save();
      return { success: false };
    }

    const newJwtId = uuid();

    session.refreshjwtidHash = await bcrypt.hash(
      newJwtId,
      Number(BCRYPT_SALT_ROUNDS)
    );

    await user.save();

    const newAccessToken = generateAccessToken(user._id, user.username, user.role);
    const newRefreshToken = generateRefreshToken(
      user._id.toString(),
      newJwtId,
      session.rememberMe
    );

    const data = {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
      sessionId,
      rememberMe: session.rememberMe
    };

    return { success: true, data };
  } catch (err) {
    return { success: false };
  }
};

/* ------------------------------------------------------------------ */
/* Logout */
/* ------------------------------------------------------------------ */
const logoutService = async (userId: string, sessionId: string) => {

  if (!userId || !sessionId) {
    return { success: false };
  }

  const user = await User.findById(userId);
  if (!user) {
    return { success: false };
  }

  user.sessions.pull({ sessionId });

  await user.save();
  return { success: true };
};


export { registerUserService, loginUserService, refreshTokenService, logoutService };