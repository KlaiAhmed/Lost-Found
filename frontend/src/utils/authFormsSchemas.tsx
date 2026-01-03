import { z } from 'zod';

const loginFormSchema = z.object({
    email: z.string().nonempty({ message: 'Email is required' }).email({ message: 'Invalid email address' }),
    password: z.string().min(8, { message: 'Password must be at least 8 characters long' }),
    rememberMe: z.boolean().optional().default(false),
});

const registerFormSchema = z.object({
    username: z.string().nonempty({ message: 'Username is required' }).regex(/^[a-zA-Z\s_]+$/, { message: 'Username can only contain letters, spaces and underscores' }).regex(/^[a-zA-Z].*[a-zA-Z]$/, { message: 'Username must start and end with a letter' }).max(20, { message: 'Username must be at most 20 characters long' }),
    email: z.string().nonempty({ message: 'Email is required' }).email({ message: 'Invalid email address' }),
    password: z.string().min(8, { message: 'Password must be at least 8 characters long' }),
    confirmPassword: z.string().min(8, { message: 'Password must be at least 8 characters long' }),
}).refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
});

export { loginFormSchema, registerFormSchema };