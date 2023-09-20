import { AuthOptions, getServerSession, Session } from 'next-auth';

import { VerifyCardComponent } from './verifyCard';

import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { NextAuthSession } from '@/types/nextAuth';

export default async function ContentDashboardComponent() {
  const session: NextAuthSession | null = await getServerSession(authOptions as any);
  const emailNotVerify = !!session?.user?.emailVerified == false;

  return (
    <div className="px-5 md:px-10">
      {emailNotVerify && <VerifyCardComponent />}
      <></>
    </div>
  );
}
