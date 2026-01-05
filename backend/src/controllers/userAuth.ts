import { Request, Response } from 'express';

import { registerUserService, loginUserService, refreshTokenService, logoutService } from '../services/userAuth';

import { setAuthCookies, clearAuthCookies } from '../utils/cookies';


const registerUser = async (req: Request, res: Response) => {
    try {
      const { username, email, password } = req.body;

      const result = await registerUserService({username,email,password});

      if (!result.success) {
        return res.status(400).json({ success: false, message: result.message });
      }

      // Auto-login after registration
      const userAgent = req.headers['user-agent'] || '';

      const loginResult = await loginUserService({email,password,rememberMe:false,userAgent})
      if (!loginResult.success || !loginResult.data) {
        return res.status(401).json({success: false,message: loginResult.message || 'login failed after registration'});
      }

      return res.status(201).json({success: true,message: 'User registered successfully'});
    } catch (err) {
      return res.status(500).json({success: false,message: 'Internal server error'});
    }
};

const loginUser = async (req: Request, res: Response) => {
    try {
      const { email, password, rememberMe = false } = req.body;
      const userAgent = req.headers['user-agent'] || '';
      const existingSessionId = req.cookies?.session_id;

      const result = await loginUserService({email,password,rememberMe,userAgent,existingSessionId});

      if (!result.success || !result.data) {
        return res.status(401).json({success: false,message: result.message || 'Invalid credentials',});
      }

      const { accessToken, refreshToken, sessionId } = result.data;

      setAuthCookies(res,accessToken,refreshToken,sessionId,rememberMe);

      return res.status(200).json({success: true,message: 'Login successful'});
    } catch (err) {
      return res.status(500).json({success: false,message: 'Internal server error'});
    }
};

const refreshTokenController = async (req: Request, res: Response) => {
  const refreshToken = req.cookies?.refresh_token;
  const sessionId = req.cookies?.session_id;
  const result = await refreshTokenService( refreshToken , sessionId);
  if (!result.success || !result.data) {
    clearAuthCookies(res);
    return res.status(401).json({ success: false });
  }
  const { accessToken, refreshToken: newRefreshToken, sessionId: newSessionId, rememberMe } = result.data;
  setAuthCookies(res, accessToken, newRefreshToken, newSessionId, rememberMe);
  return res.status(200).json({ success: true });
};


const logoutUser = async (req: Request, res: Response) => {
  const userId = (req as any).user?._id;
  const sessionId = req.cookies?.session_id;

  if (userId && sessionId) {
    await logoutService(userId, sessionId);
  }

  clearAuthCookies(res);
  return res.status(200).json({ success: true });
};

export { registerUser, loginUser, refreshTokenController, logoutUser };
