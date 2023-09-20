import { z } from 'zod';

export const registerFormSchema = z
  .object({
    email: z
      .string({
        required_error: 'This field is required!',
      })
      .nonempty('This field is required!'),
    name: z
      .string({
        required_error: 'This field is required!',
      })
      .nonempty('This field is required!'),
    password: z
      .string({
        required_error: 'This field is required!',
      })
      .min(8, 'Must have at least 8 characters')
      .regex(/.*[A-Z].*/, 'Must have at least one uppercase character')
      .regex(/.*[a-z].*/, 'Must have at least one lowercase character')
      .regex(/.*[0-9].*/, 'Must have at least one number')
      .regex(
        /.*[`~<>?,./!@#$%^&*()\-_+="'|{}[\];:\\].*/,
        'Must have at least one special character',
      )
      .nonempty('This field is required!'),
    confirmPassword: z
      .string({
        required_error: 'This field is required!',
      })
      .min(8, 'Must have at least 8 characters')
      .regex(/.*[A-Z].*/, 'Must have at least one uppercase character')
      .regex(/.*[a-z].*/, 'Must have at least one lowercase character')
      .regex(/.*[0-9].*/, 'Must have at least one number')
      .regex(
        /.*[`~<>?,./!@#$%^&*()\-_+="'|{}[\];:\\].*/,
        'Must have at least one special character',
      )
      .nonempty('This field is required!'),
  })
  .refine(
    (data) => {
      return data.password === data.confirmPassword;
    },
    {
      message: 'The passwords did not match',
      path: ['confirmPassword'],
    },
  );
