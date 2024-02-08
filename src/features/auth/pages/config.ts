import * as zod from 'zod';

export const RegisterSchema = zod
  .object({
    name: zod
      .string()
      .min(1, { message: 'First name must contain at least 1 character' }),
    lastname: zod
      .string()
      .min(1, { message: 'Last name must contain at least 1 character' }),
    email: zod.string().email(),
    username: zod
      .string()
      .min(1, { message: 'Username must contain at least 1 character' }),
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
