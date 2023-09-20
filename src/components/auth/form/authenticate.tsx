import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

import { ButtonComponent } from '../../util/button';
import { InputComponent } from '../../util/input';

import { UseAuthenticateFormHooks } from '@/hooks/formHooks/authenticateFormHooks';
import { type AuthenticateFormData } from '@/zod/types/authenticateFormZodType';

type AuthenticateTypeProps = {
  handleFormErrorShake: () => void;
  setFormType: (string: 'signIn' | 'signUp') => void;
};

export default function AuthenticateComponent({
  setFormType,
  handleFormErrorShake,
}: AuthenticateTypeProps) {
  const { replace } = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { authenticateErrors, authenticateTrigger, register, handleSubmit } =
    UseAuthenticateFormHooks();
  const emailProviderSigin = async (data: { email: string; password: string }) => {
    setIsLoading(true);
    await signIn('credentials', {
      redirect: false,
      email: data.email,
      password: data.password,
    }).then((resp: any) => {
      if (resp.error) {
        toast.error(resp.error);
      }

      replace('/dashboard');
    });
    setIsLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit(emailProviderSigin)}
      className="w-full border-[2px] px-3 py-4 shadow-sm rounded-md flex flex-col gap-y-3"
    >
      <InputComponent<AuthenticateFormData>
        title="email"
        entity="email"
        name="email"
        type="text"
        register={register}
        trigger={authenticateTrigger}
        errors={!!authenticateErrors.email}
        errorsMsg={authenticateErrors?.email?.message as string}
      />
      <div className="relative">
        <p
          className="text-[12px] absolute top-0 right-1 text-blue-700 font-[500] cursor-pointer"
          onClick={() => replace('/forgotPassword')}
        >
          Forgot password?
        </p>
        <InputComponent<AuthenticateFormData>
          title="password"
          name="password"
          entity="password"
          type={showPassword ? 'text' : 'password'}
          register={register}
          trigger={authenticateTrigger}
          errors={!!authenticateErrors.password}
          errorsMsg={authenticateErrors?.password?.message as string}
        />
        <div
          className="absolute right-5 top-[50px] md:top-[55px] cursor-pointer text-gray-400 text-[16px] md:text-[20px]"
          onClick={() => {
            setShowPassword((prev) => !prev);
          }}
        >
          {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
        </div>
      </div>
      {authenticateErrors.root && (
        <p className="text-red-700 text-sm w-full">{authenticateErrors.root.message}</p>
      )}
      <div className="text-sm flex justify-start items-center gap-x-2 text-gray-600 font-[500] mt-5">
        <p>New User ?</p>
        <span
          className="text-blue-700 animate-pulse font-[500] cursor-pointer"
          onClick={() => setFormType('signUp')}
        >
          Sign Up
        </span>
      </div>
      <ButtonComponent
        type="submit"
        title={isLoading ? 'Signing in...' : `Sign in with your email`}
        disabled={isLoading ? true : false}
        className={`text-white bg-slate-800
            font-[500]  py-3 flex gap-x-2 justify-center items-center px-5 
            rounded-md shadow-md  hover:scale-105 duration-200 active:scale-95
            hover:brightness-[0.98] w-full active:shadow-none ${
              isLoading && 'brightness-95 animate-pulse'
            }
          `}
        onClick={handleFormErrorShake}
      />
    </form>
  );
}
