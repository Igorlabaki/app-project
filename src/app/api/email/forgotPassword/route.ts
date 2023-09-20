import { NextResponse, NextRequest } from 'next/server';

import { forgotPasswordEmailFactory } from '@/backend/useCase/email/forgotPasswordCase/forgotPasswordEmailFactory';

export async function POST(req: NextRequest) {
  const res = await req.json();

  const { email, username } = res;

  const sendEmail = await forgotPasswordEmailFactory().handle({
    email,
    username,
  });

  return NextResponse.json(sendEmail);
}
