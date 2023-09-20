import { NextRequest, NextResponse } from 'next/server';

export default function midleware(request: NextRequest) {
  const token = request.cookies.get('next-auth.session-token')?.value;

  const signInUrl = new URL('/', request.url);
  const dashboardUrl = new URL('/dashboard', request.url);

  if (!token) {
    if (request.nextUrl.pathname === '/') {
      return NextResponse.next();
    }

    return NextResponse.redirect(signInUrl);
  } else {
    if (request.nextUrl.pathname === '/dashboard') {
      return NextResponse.next();
    }

    return NextResponse.redirect(dashboardUrl);
  }
}

export const config = {
  matcher: ['/dashboard/:path*', '/'],
};
