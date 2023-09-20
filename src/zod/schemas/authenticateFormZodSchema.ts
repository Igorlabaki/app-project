import { z } from 'zod';

export const authenticateFormSchema = z.object({
  email: z
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
    .regex(/.*[`~<>?,./!@#$%^&*()\-_+="'|{}[\];:\\].*/, 'Must have at least one special character')
    .nonempty('This field is required!'),
});
