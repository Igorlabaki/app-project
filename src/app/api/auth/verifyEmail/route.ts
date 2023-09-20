import { now } from 'next-auth/client/_utils';
import { NextResponse, type NextRequest } from 'next/server';

import { type IUserParams } from '@/backend/repository/IUserRepository';
import { updateUserFactory } from '@/backend/useCase/auth/updateUserCase/updateUserFacory';

export async function POST(req: NextRequest) {
  const res = await req.json();

  const { id }: IUserParams = res;
  try {
    const newUser = await updateUserFactory().handle({ id, emailVerified: new Date() });
    return NextResponse.json(newUser);
  } catch (error: any) {
    return NextResponse.json(error);
  }
}
