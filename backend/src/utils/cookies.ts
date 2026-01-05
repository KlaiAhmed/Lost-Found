import { Response } from 'express';
import { v4 as uuid } from 'uuid';

const isProd = process.env.NODE_ENV === 'production';

const baseOptions = {
  httpOnly: true,
  secure: isProd,
  sameSite: 'lax' as const,
  path: '/',
};

const ONE_DAY = 24 * 60 * 60 * 1000;
const SEVEN_DAYS = 7 * ONE_DAY;

const setAuthCookies = (res: Response,accessToken: string,refreshToken: string,sessionId: string,rememberMe: boolean) => {
    res.cookie('access_token', accessToken, {
        ...baseOptions,
        maxAge: 15 * 60 * 1000,
    });

    const refreshMaxAge = rememberMe ? SEVEN_DAYS : ONE_DAY;

    res.cookie('refresh_token', refreshToken, {
        ...baseOptions,
        maxAge: refreshMaxAge,
    });

    res.cookie('session_id', sessionId, {
        ...baseOptions,
        maxAge: refreshMaxAge,
    });

    res.cookie('csrf_token', uuid(), {
        httpOnly: false,
        secure: isProd,
        sameSite: 'lax',
        path: '/',
        maxAge: refreshMaxAge,
    });
};

const clearAuthCookies = (res: Response) => {
    res.clearCookie('access_token', baseOptions);
    res.clearCookie('refresh_token', baseOptions);
    res.clearCookie('session_id', baseOptions);

    res.clearCookie('csrf_token', {
        httpOnly: false,
        secure: isProd,
        sameSite: 'lax',
        path: '/',
    });
};

export { setAuthCookies, clearAuthCookies };