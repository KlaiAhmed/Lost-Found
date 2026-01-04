import { z } from "zod";

const loginSchema = z.object({
    email: z.string().nonempty({ message: 'Email is required' }).email({ message: 'Invalid email address' }),
    password: z.string().min(8, { message: 'Password must be at least 8 characters long' }),
    rememberMe: z.boolean().optional().default(false),
});

const registerSchema = z.object({
    username: z.string().min(2, { message: 'Username is required' }).regex(/^[a-zA-Z\s_]+$/, { message: 'Username can only contain letters, spaces and underscores' }).regex(/^[a-zA-Z].*[a-zA-Z]$/, { message: 'Username must start and end with a letter' }).max(20, { message: 'Username must be at most 20 characters long' }),
    email: z.string().nonempty({ message: 'Email is required' }).email({ message: 'Invalid email address' }),
    password: z.string().min(8, { message: 'Password must be at least 8 characters long' }),
    confirmPassword: z.string().min(8, { message: 'Password must be at least 8 characters long' }),
}).refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
});

const emptyToUndefined = (v: unknown) => (v === '' ? undefined : v);

const updatedDataSchema = z.object({
    username: z.preprocess(
      emptyToUndefined,
      z.string().min(2).max(20).optional()
    ),
    email: z.preprocess(
      emptyToUndefined,
      z.string().email().optional()
    ),
    currentPassword: z.string().min(8),
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
    { message: 'Nothing to update' }
  )
  .refine(
    (data) => !data.password || data.password === data.confirmPassword,
    { path: ['confirmPassword'], message: 'Passwords do not match' }
  );


export { updatedDataSchema, registerSchema, loginSchema };

export type UpdatedData = z.infer<typeof updatedDataSchema>;
export type RegisterData = z.infer<typeof registerSchema>;
export type LoginData = z.infer<typeof loginSchema>;
