import { z } from 'zod';

const loginFormSchema = z.object({
    email: z.string().nonempty({ message: 'Email is required' }).email({ message: 'Invalid email address' }),
    password: z.string().min(8, { message: 'Password must be at least 8 characters long' }),
    rememberMe: z.boolean().optional().default(false),
});

const registerFormSchema = z.object({
    username: z.string().min(2, { message: 'Username is required' }).regex(/^[a-zA-Z\s_]+$/, { message: 'Username can only contain letters, spaces and underscores' }).regex(/^[a-zA-Z].*[a-zA-Z]$/, { message: 'Username must start and end with a letter' }).max(20, { message: 'Username must be at most 20 characters long' }),
    email: z.string().nonempty({ message: 'Email is required' }).email({ message: 'Invalid email address' }),
    password: z.string().min(8, { message: 'Password must be at least 8 characters long' }),
    confirmPassword: z.string().min(8, { message: 'Password must be at least 8 characters long' }),
}).refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
});

const emptyToUndefined = (val: unknown) =>
  val === '' ? undefined : val;

const updatedDataSchema = z
  .object({
    username: z.preprocess(
      emptyToUndefined,
      z.string().min(2).max(20).regex(/^[a-zA-Z\s_]+$/).regex(/^[a-zA-Z].*[a-zA-Z]$/).optional()
    ),
    email: z.preprocess(
      emptyToUndefined,
      z.string().email().optional()
    ),
    currentPassword: z.string().min(8, 'Current password is required'),
    password: z.preprocess(
      emptyToUndefined,
      z.string().min(8).optional()
    ),
    confirmPassword: z.preprocess(
      emptyToUndefined,
      z.string().min(8).optional()
    ),
  })
  .refine(
    (data) => data.username || data.email || data.password,
    {
        message: 'You must update at least one field',
        path: ['username'],
    }
  )
  .refine(
    (data) => !data.password || data.password === data.confirmPassword,
    {
      message: 'Passwords do not match',
      path: ['confirmPassword'],
    }
  );


export { loginFormSchema, registerFormSchema, updatedDataSchema };