import { NextResponse, type NextRequest } from 'next/server';

import { type IUserParams } from '@/backend/repository/IUserRepository';
import { updatePasswordFactory } from '@/backend/useCase/auth/updatePasswordUserCase/updatePasswordFacory';

export async function POST(req: NextRequest) {
  const res = await req.json();

  const { password, id }: IUserParams = res;
  try {
    const newUser = await updatePasswordFactory().handle({ password, id });
    return NextResponse.json(newUser);
  } catch (error: any) {
    return NextResponse.json(error);
  }
}
