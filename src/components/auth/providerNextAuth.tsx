'use client';

import { SessionProvider } from 'next-auth/react';

interface ProviderNextAuthProps {
  children: React.ReactNode;
}

export function ProviderNextAuth({ children }: ProviderNextAuthProps): React.ReactElement {
  return <SessionProvider>{children}</SessionProvider>;
}
