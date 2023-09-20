import { useForm } from 'react-hook-form';

import { updatePasswordFormSchema } from '@/zod/schemas/updatePasswordFormZodSchema';
import { UpdatePasswordFormData } from '@/zod/types/updatePasswordFormZodType';
import { zodResolver } from '@hookform/resolvers/zod';

export function UseUpdatePasswordFormHooks() {
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
  } = useForm<UpdatePasswordFormData>({
    resolver: zodResolver(updatePasswordFormSchema),
  });

  const passwordWatch = watch('password');
  const confirmPasswordWatch = watch('confirmPassword');

  return {
    watch,
    reset,
    errors,
    trigger,
    setValue,
    setError,
    register,
    getValues,
    handleSubmit,
    passwordWatch,
    confirmPasswordWatch,
  };
}
