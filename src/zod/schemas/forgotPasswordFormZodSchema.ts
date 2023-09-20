import { z } from 'zod';

export const forgotPasswordFormSchema = z.object({
  email: z
    .string({
      required_error: 'This field is required!',
    })
    .nonempty('This field is required!'),
});
