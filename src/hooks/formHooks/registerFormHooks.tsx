import { useForm } from 'react-hook-form';

import { registerFormSchema } from '@/zod/schemas/registerFormZodSchema';
import { RegisterFormData } from '@/zod/types/registerFormZodType';
import { zodResolver } from '@hookform/resolvers/zod';

export function UseRegisterFormHooks() {
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
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema),
  });

  const emailWatch = watch('email');
  const passwordWatch = watch('password');
  const confirmPasswordWatch = watch('confirmPassword');

  return {
    watch,
    reset,
    trigger,
    register,
    setValue,
    setError,
    getValues,
    emailWatch,
    handleSubmit,
    passwordWatch,
    confirmPasswordWatch,
    registerErrors: errors,
  };
}
