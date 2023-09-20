import { NextResponse, NextRequest } from 'next/server';

import { verifyEmailFactory } from '@/backend/useCase/email/verifyEmailCase/verifyEmailFactory';

export async function POST(req: NextRequest) {
  const res = await req.json();

  const { email } = res;

  const sendEmail = await verifyEmailFactory().handle(email);

  return NextResponse.json(sendEmail);
}
