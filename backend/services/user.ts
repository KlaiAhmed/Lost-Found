import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { User } from '../models/User';

const registerUser = async (req: Request, res: Response) => {
    try {
        const newUser = req.body;

        const hashedPassword = await bcrypt.hash(newUser.password, Number(process.env.BCRYPT_SALT_ROUNDS) || 10);

        const user = new User({
            name: newUser.name,
            email: newUser.email,
            password: hashedPassword,
            role: 'user',
            lastLogin: Date.now(),
            failedLoginAttempts: 0,
            lockUntil: null
        });

        return res.status(200).json({ success: true, message: 'Login successful' });
    } catch (err) {
        return res.status(500).json({ error: 'Internal server error' });
    }
}


export { registerUser };