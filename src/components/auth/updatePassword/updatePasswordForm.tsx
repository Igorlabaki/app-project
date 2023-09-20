'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

import { UpdatePasswordFormData } from '../../../zod/types/updatePasswordFormZodType';

import { ButtonComponent } from '@/components/util/button';
import { InputComponent } from '@/components/util/input';
import { UseUpdatePasswordFormHooks } from '@/hooks/formHooks/updatePasswordFormHook';
import { api } from '@/services/axios';

interface UpdatePasswordForm {
  id: string;
}

export function UpdatePasswordForm({ id }: UpdatePasswordForm) {
  const { replace } = useRouter();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { errors, trigger, register, handleSubmit } = UseUpdatePasswordFormHooks();

  async function updatePassword(data: { password: string }) {
    await api
      .post('/api/auth/updatePassword', {
        id,
        password: data.password,
      })
      .then((resp: any) => {
        if (resp.data?.message) {
          toast.error(resp.data?.message);
        }
        if (resp.data?.id) {
          toast.success('Password updated sucefully');
          setTimeout(() => replace('/'), 2000);
        }
      });
  }

  return (
    <form
      onSubmit={handleSubmit(updatePassword)}
      className="w-full"
    >
      <span className="relative">
        <InputComponent<UpdatePasswordFormData>
          title="password"
          name="email"
          entity="password"
          type={showPassword ? 'text' : 'password'}
          register={register}
          trigger={trigger}
          errors={!!errors.password}
          errorsMsg={errors?.password?.message as string}
        />
        <div
          className="absolute right-5 top-[50px] md:top-[55px] cursor-pointer text-gray-400 text-[16px] md:text-[20px]"
          onClick={() => {
            setShowPassword((prev) => !prev);
          }}
        >
          {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
        </div>
      </span>
      <InputComponent<UpdatePasswordFormData>
        title="Confirm Password"
        name="confirmPassword"
        entity="confirmPassword"
        type={showPassword ? 'text' : 'password'}
        register={register}
        trigger={trigger}
        errors={!!errors.confirmPassword}
        errorsMsg={errors?.confirmPassword?.message as string}
      />
      <ButtonComponent
        type="submit"
        title={`Change password`}
        className={`text-white bg-slate-800
            font-[500]  py-3 flex gap-x-2 justify-center items-center px-5 mt-5
            rounded-md shadow-md  hover:scale-105 duration-200 active:scale-95
            hover:brightness-[0.98] w-full active:shadow-none
        `}
      />
    </form>
  );
}
