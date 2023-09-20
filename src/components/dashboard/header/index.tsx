import { AuthOptions, Session, getServerSession } from 'next-auth';
import { cookies } from 'next/headers';

import { NextAuthLogoComponent } from '../../util/nextAuthLogo';
import { DashBoardMenuHeader } from './menu';

import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { UserAvatarComponent } from '@/components/util/userAvatar';

export const DashboardHeader = async () => {
  const session: Session | null = await getServerSession(authOptions as AuthOptions);
  /*   const name: string | undefined = cookies().get('next-auth.session-token')?.value; */

  const renderUserInfo = () => {
    if (session?.user) {
      const { user } = session;
      return (
        <>
          <div className={`flex justify-center items-center gap-x-1`}>
            <p
              className={`hidden md:flex text-gray-600 font-semibold text-sm top`}
            >{`Bem vindo, ${user?.name}`}</p>
          </div>
          <UserAvatarComponent avatar={user?.image as string} />
        </>
      );
    }
  };

  return (
    <header className="min-w-screen flex justify-between px-5 md:px-10 items-center py-5 shadow-md">
      <NextAuthLogoComponent />
      <div
        className={`flex flex-row-reverse md:flex-row justify-center items-center gap-x-3 relative`}
      >
        {renderUserInfo()}
        <DashBoardMenuHeader />
      </div>
    </header>
  );
};
