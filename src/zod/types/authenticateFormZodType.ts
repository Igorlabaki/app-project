import { authenticateFormSchema } from '../schemas/authenticateFormZodSchema';

import { z } from 'zod';

export type AuthenticateFormData = z.infer<typeof authenticateFormSchema>;
