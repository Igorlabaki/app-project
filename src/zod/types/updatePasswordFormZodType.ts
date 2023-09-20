import { updatePasswordFormSchema } from '../schemas/updatePasswordFormZodSchema';

import { z } from 'zod';

export type UpdatePasswordFormData = z.infer<typeof updatePasswordFormSchema>;
