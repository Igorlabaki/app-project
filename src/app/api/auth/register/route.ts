import { NextResponse, type NextRequest } from 'next/server';

import { type IUserParams } from '@/backend/repository/IUserRepository';
import { createUserFactory } from '@/backend/useCase/auth/createNewUserCase/createNewUserFacory';

export async function POST(req: NextRequest) {
  const res = await req.json();

  const { password, email, name }: IUserParams = res;
  try {
    const newUser = await createUserFactory().handle({ password, email, name });

    return NextResponse.json(newUser);
  } catch (error: any) {
    return NextResponse.json(error);
  }
}
