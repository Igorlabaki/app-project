'use client';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { IoIosArrowRoundBack } from 'react-icons/io';

import { ForgotPasswordFormData } from '../../../zod/types/forgotPasswordFormZodType';

import { ButtonComponent } from '@/components/util/button';
import { InputComponent } from '@/components/util/input';
import { UseForgotPasswordFormHooks } from '@/hooks/formHooks/forgotPasswordFormHooks';
import { api } from '@/services/axios';

export function ForgotPasswordForm() {
  const { replace } = useRouter();
  const { errors, trigger, register, handleSubmit } = UseForgotPasswordFormHooks();

  async function sendEmailToVerifyAccount(data: { email: string }) {
    await api
      .post('/api/email/forgotPassword', {
        email: data.email,
      })
      .then((resp: any) => {
        if (resp.data?.message) {
          toast.error(resp.data?.message);
        }
        if (resp.data?.id) {
          toast.success("We've just sent you an email with a link to reset your password.");
          setTimeout(() => replace('/'), 3000);
        }
      });
  }

  return (
    <form onSubmit={handleSubmit(sendEmailToVerifyAccount)}>
      <IoIosArrowRoundBack
        onClick={() => replace('/')}
        className={'absolute left-5 top-5 text-black text-[24px] cursor-pointer'}
      />
      <InputComponent<ForgotPasswordFormData>
        title="Enter your user account's verified email address and we will send you a password reset link."
        entity="email"
        name="email"
        type="text"
        register={register}
        trigger={trigger}
        errors={!!errors.email}
        errorsMsg={errors?.email?.message as string}
      />
      <ButtonComponent
        type="submit"
        title={`Send email`}
        className={`text-white bg-slate-800
            font-[500]  py-3 flex gap-x-2 justify-center items-center px-5 mt-5
            rounded-md shadow-md  hover:scale-105 duration-200 active:scale-95
            hover:brightness-[0.98] w-full active:shadow-none
        `}
      />
    </form>
  );
}
