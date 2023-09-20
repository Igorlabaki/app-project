import { useForm } from 'react-hook-form';

import { forgotPasswordFormSchema } from '@/zod/schemas/forgotPasswordFormZodSchema';
import { ForgotPasswordFormData } from '@/zod/types/forgotPasswordFormZodType';
import { zodResolver } from '@hookform/resolvers/zod';

export function UseForgotPasswordFormHooks() {
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
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordFormSchema),
  });

  const emailWatch = watch('email');

  return {
    watch,
    reset,
    errors,
    trigger,
    setError,
    register,
    setValue,
    getValues,
    emailWatch,
    handleSubmit,
  };
}
