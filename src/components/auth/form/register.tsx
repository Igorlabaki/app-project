import { useState } from 'react';
import toast from 'react-hot-toast';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

import { ButtonComponent } from '../../util/button';
import { InputComponent } from '../../util/input';

import { IUserParams } from '@/backend/repository/IUserRepository';
import { UseRegisterFormHooks } from '@/hooks/formHooks/registerFormHooks';
import { api } from '@/services/axios';
import { RegisterFormData } from '@/zod/types/registerFormZodType';

type RegisterTypeProps = {
  handleFormErrorShake: () => void;
  setFormType: (string: 'signIn' | 'signUp') => void;
};

export default function RegisterComponent({
  setFormType,
  handleFormErrorShake,
}: RegisterTypeProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { registerErrors, register, handleSubmit, trigger } = UseRegisterFormHooks();

  const emailProviderSigUp = async (data: IUserParams) => {
    setIsLoading(true);
    await api
      .post('/api/auth/register', {
        ...data,
      })
      .then((resp: any) => {
        console.log(resp?.data);
        if (resp.data?.message) {
          toast.error(resp.data?.message);
        }
        if (resp.data?.id) {
          toast.success('Your new account has been successfully created. Welcome to our platform.');
          setTimeout(() => setFormType('signIn'), 2500);
        }
      });
    setIsLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit(emailProviderSigUp)}
      className="w-full border-[2px] border-gray-200 px-3 py-4 shadow-md rounded-md flex flex-col gap-y-3"
    >
      <InputComponent<RegisterFormData>
        title="email"
        entity="email"
        name="email"
        type="email"
        register={register}
        trigger={trigger}
        errors={!!registerErrors.email}
        errorsMsg={registerErrors?.email?.message as string}
      />
      <InputComponent<RegisterFormData>
        title="username"
        entity="name"
        name="username"
        type="text"
        register={register}
        trigger={trigger}
        errors={!!registerErrors.name}
        errorsMsg={registerErrors?.name?.message as string}
      />
      <div className="relative">
        <InputComponent<RegisterFormData>
          title="password"
          name="email"
          entity="password"
          type={showPassword ? 'text' : 'password'}
          register={register}
          trigger={trigger}
          errors={!!registerErrors.password}
          errorsMsg={registerErrors?.password?.message as string}
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
      <InputComponent<RegisterFormData>
        title="Confirm Password"
        name="confirmPassword"
        entity="confirmPassword"
        type={showPassword ? 'text' : 'password'}
        register={register}
        trigger={trigger}
        errors={!!registerErrors.confirmPassword}
        errorsMsg={registerErrors?.confirmPassword?.message as string}
      />
      {registerErrors.root && (
        <p className="text-red-700 text-sm w-full">{registerErrors.root.message}</p>
      )}
      <div className="text-sm flex justify-start items-center gap-x-2 text-gray-600 font-[500] mt-5">
        <p>Already have an account? ?</p>
        <span
          className="text-blue-700 animate-pulse font-[500] cursor-pointer"
          onClick={() => setFormType('signIn')}
        >
          Sign In
        </span>
      </div>
      <ButtonComponent
        type="submit"
        title={isLoading ? 'Signing up...' : `Sign up with your email`}
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
