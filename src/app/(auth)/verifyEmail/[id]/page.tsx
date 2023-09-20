import Link from 'next/link';

import { NextAuthLogoComponent } from '@/components/util/nextAuthLogo';
import { api } from '@/services/axios';
import { User } from '@prisma/client';

interface VerifyEmailProps {
  params: {
    id: string;
  };
}

export default async function VerifyEmail({ params }: VerifyEmailProps) {
  const user = await api
    .post('/api/auth/verifyEmail', {
      id: params.id,
    })
    .then((resp: { data: User }) => resp.data);

  return (
    <section className="flex bg-slate-800 min-h-screen justify-center items-center flex-col p-5 md:p-0">
      <div
        className="
        w-[90%] md:w-[400px]
        shadow-2xl rounded-md bg-gray-100
        py-5 px-4 md:px-10  border-[2px] border-gray-400
        flex flex-col justify-start items-center gap-5"
      >
        <NextAuthLogoComponent />
        <h1 className="text-sm font-[600] text-center">
          Success, {user.name}: Your Email has been Verified!
        </h1>
        <Link href={'/'}>home</Link>
      </div>
    </section>
  );
}
