import rate from 'express-rate-limit';

const rateLimiter = ( max = 10, windowMs = 5 * 60 * 1000) => {
    return rate({ 
        windowMs,
        max,
        message: 'Too many requests, please try again later.'
    });
}

export default rateLimiter;