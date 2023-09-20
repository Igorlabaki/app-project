import { registerFormSchema } from '../schemas/registerFormZodSchema';

import { z } from 'zod';

export type RegisterFormData = z.infer<typeof registerFormSchema>;
