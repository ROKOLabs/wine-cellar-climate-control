import * as zod from 'zod';

export const RegisterSchema = zod
  .object({
    email: zod.string().email(),
    password: zod
      .string()
      .min(6, { message: 'Password must contain at least 6 characters' }),
    confirmPassword: zod
      .string()
      .min(6, { message: 'Password must contain at least 6 characters' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export const LoginSchema = zod.object({
  email: zod.string().email(),
  password: zod
    .string()
    .min(6, { message: 'Password must contain at least 6 character(s)' }),
});
