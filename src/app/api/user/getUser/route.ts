import { NextResponse, type NextRequest } from 'next/server';

import { getUserFactory } from '@/backend/useCase/user/getUserCase/getUserFacory';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const obj = Object.fromEntries(searchParams.entries());
  const { email } = obj;
  try {
    const user = await getUserFactory().handle(email);

    return NextResponse.json(user);
  } catch (error: any) {
    return NextResponse.json(error);
  }
}
