import { useForm } from 'react-hook-form';

import { authenticateFormSchema } from '@/zod/schemas/authenticateFormZodSchema';
import { AuthenticateFormData } from '@/zod/types/authenticateFormZodType';
import { zodResolver } from '@hookform/resolvers/zod';

export function UseAuthenticateFormHooks() {
  const {
    watch,
    reset,
    trigger,
    register,
    setValue,
    setError,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthenticateFormData>({
    resolver: zodResolver(authenticateFormSchema),
  });

  const emailWatch = watch('email');
  const authenticateTrigger = trigger;
  const passwordWatch = watch('password');

  return {
    watch,
    reset,
    register,
    setValue,
    setError,
    getValues,
    emailWatch,
    handleSubmit,
    passwordWatch,
    authenticateTrigger,
    authenticateErrors: errors,
  };
}
