import { Request, Response, NextFunction} from 'express';

const requireAuth = (req: Request, res: Response, next: NextFunction) => {
    const accessToken=req.cookies.accessToken;
    if(!accessToken){
        return res.status(401).json({ error: 'Unauthorized' });
    }
    next();
}

export default requireAuth;