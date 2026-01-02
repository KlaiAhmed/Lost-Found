import { z } from 'zod';

const loginFormSchema = z.object({
    email: z.string().nonempty({ message: 'Email is required' }).email({ message: 'Invalid email address' }),
    password: z.string().min(8, { message: 'Password must be at least 8 characters long' }),
    rememberMe: z.boolean().optional().default(false),
});

export default loginFormSchema;