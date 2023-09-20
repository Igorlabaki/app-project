'use client';

import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { FaTwitter } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { VscGithub } from 'react-icons/vsc';

import { ButtonComponent } from '../../util/button';
import { NextAuthLogoComponent } from '../../util/nextAuthLogo';
import AutheticateComponent from './authenticate';
import RegisterComponent from './register';

import { shakeAnimation } from '@/constants/animations';
import { UseAuthenticateFormHooks } from '@/hooks/formHooks/authenticateFormHooks';
import { UseRegisterFormHooks } from '@/hooks/formHooks/registerFormHooks';
import { type NextAuthProvidersType } from '@/types/nextAuthProviders';
import { capitalize } from '@/util/capitalizeWord';
import { useAnimation, motion } from 'framer-motion';

export function FormComponent(): React.ReactElement {
  const controlsModal = useAnimation();
  const { get } = useSearchParams();

  const [formType, setFormType] = useState<'signIn' | 'signUp'>('signIn');
  const { registerErrors } = UseRegisterFormHooks();
  const { authenticateErrors } = UseAuthenticateFormHooks();

  const signInForm = formType.includes('signIn');
  const signUpForm = formType.includes('signUp');

  const handleFormErrorShake = async () => {
    if (signUpForm) {
      if (Object.keys(registerErrors).length > 0) {
        controlsModal.start(shakeAnimation);
      }
    }

    if (signInForm) {
      if (Object.keys(authenticateErrors).length > 0) {
        controlsModal.start(shakeAnimation);
      }
    }
  };

  const nextAuthproviders: NextAuthProvidersType[] = [
    {
      provider: 'google',
      icon: <FcGoogle size={25} />,
      style: 'text-gray-600 bg-gray-200',
    },
    {
      provider: 'github',
      icon: <VscGithub size={25} />,
      style: 'text-white bg-black',
    },
    {
      provider: 'twitter',
      icon: <FaTwitter size={25} />,
      style: 'text-white bg-[#1DA1F2]',
    },
  ];

  useEffect(() => {
    const nextAuthError = get('error');
    if (nextAuthError) {
      toast.error(nextAuthError);
    }
  }, []);

  return (
    <motion.div
      animate={controlsModal}
      className="
        w-[90%] md:w-[400px]
        shadow-2xl rounded-md bg-gray-100
        py-5 px-4 md:px-10  border-[2px] border-gray-400
        flex flex-col justify-start items-center gap-5"
    >
      <NextAuthLogoComponent />
      {signInForm && (
        <AutheticateComponent
          handleFormErrorShake={handleFormErrorShake}
          setFormType={setFormType}
        />
      )}
      {signUpForm && (
        <RegisterComponent
          handleFormErrorShake={handleFormErrorShake}
          setFormType={setFormType}
        />
      )}
      <div className="flex flex-col gap-y-3 w-full">
        {nextAuthproviders.map((item: NextAuthProvidersType) => {
          return (
            <ButtonComponent
              key={item.provider}
              type="button"
              title={`Sign in with ${capitalize(item?.provider)}`}
              icon={item?.icon}
              onClick={async () => await signIn(item.provider)}
              className={`${item?.style}
                    font-[500]  py-3 flex gap-x-2 justify-center items-center px-5 
                    rounded-md shadow-md  hover:scale-105 duration-200 active:scale-95
                    hover:brightness-[0.98] w-full active:shadow-none
                  `}
            />
          );
        })}
      </div>
    </motion.div>
  );
}
