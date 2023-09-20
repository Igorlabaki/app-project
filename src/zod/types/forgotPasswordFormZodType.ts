import { forgotPasswordFormSchema } from '../schemas/forgotPasswordFormZodSchema';

import { z } from 'zod';

export type ForgotPasswordFormData = z.infer<typeof forgotPasswordFormSchema>;
