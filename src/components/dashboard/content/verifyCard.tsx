'use client';
import React, { useState } from 'react';
import toast from 'react-hot-toast';

import { ButtonComponent } from '@/components/util/button';
import WarningComponent from '@/components/util/warning';
import useUserContext from '@/hooks/context/useUserContext';
import { api } from '@/services/axios';

export function VerifyCardComponent() {
  const { user } = useUserContext();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const resendEmailVerify = async () => {
    setIsLoading(true);
    await api
      .post('/api/email/verifyEmail', {
        email: user?.email,
      })
      .then((resp) => resp.data)
      .then((data) => {
        if (data?.message) {
          toast.error(data?.message);
        }

        if (data?.id) {
          toast.success('Email was sended sucefully');
        }
      });
    setIsLoading(false);
  };

  return (
    <WarningComponent
      bgColor={'bg-red-50'}
      textColor={'text-red-800'}
      title={'Email Verification Required!'}
      text={'Please verify your email to access all platform features.'}
      button={
        <ButtonComponent
          title={isLoading ? 'Sending email' : 'Resend email'}
          className={`text-white bg-red-800  active:scale-95 hover:scale-105 duration-200 rounded-md py-2 w-fit px-5 ${
            isLoading && 'brightness-95 animate-pulse'
          }`}
          disabled={isLoading ? true : false}
          onClick={resendEmailVerify}
        />
      }
    />
  );
}
