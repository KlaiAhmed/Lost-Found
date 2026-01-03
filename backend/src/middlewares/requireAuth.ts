import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { refreshTokenService } from '../services/userAuth';
import { clearAuthCookies, setAuthCookies } from '../utils/cookies';

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

const JWT_SECRET = process.env.JWT_SECRET as string;
if (!JWT_SECRET) {
  throw new Error('JWT_SECRET is not defined in environment variables');
}

const requireAccess = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const accessToken = req.cookies?.access_token;
    const refreshToken = req.cookies?.refresh_token;
    const sid = req.cookies?.session_id;
    const csrfToken = req.headers['x-csrf-token'];
    const sessionCsrfToken = req.cookies?.csrf_token;

    if (!refreshToken || csrfToken !== sessionCsrfToken) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    let decoded;

    try {
      if (!accessToken) throw new Error();
      decoded = jwt.verify(accessToken, JWT_SECRET);
    } catch {
      const result = await refreshTokenService(refreshToken, sid);

      if (!result.success || !result.data) {
        clearAuthCookies(res);
        return res.status(401).json({ error: 'Unauthorized' });
      }

      const { accessToken, refreshToken: newRefreshToken, sessionId, rememberMe } = result.data;

      setAuthCookies(res, accessToken, newRefreshToken, sessionId, rememberMe);

      decoded = jwt.verify(accessToken, JWT_SECRET);
    }

    req.user = decoded;
    next();
  } catch {
    return res.status(401).json({ error: 'Unauthorized' });
  }
};



const requireAuth = (req: any , res: Response, next: NextFunction) => {
  try {
    const token = req.cookies?.refresh_token;
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    const decoded = jwt.verify(token, JWT_SECRET);

    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
};

export { requireAccess, requireAuth };
