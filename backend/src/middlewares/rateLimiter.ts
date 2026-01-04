import rate from 'express-rate-limit';

const isDev = process.env.NODE_ENV === 'development';

const rateLimiter = ( max = 10, windowMs = 5 * 60 * 1000) => {
    
    if (isDev) {
        return (req, res, next) =>  next();
    }
    return rate({ 
        windowMs,
        max,
        message: 'Too many requests, please try again later.'
    });
}

export default rateLimiter;