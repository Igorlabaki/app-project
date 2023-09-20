import type { Metadata } from 'next';

import { ProviderNextAuth } from '@/components/auth/providerNextAuth';

import './globals.css';

import ToasterContext from '@/context/toasterContext';
import { UserContextProvider } from '@/context/userContext';

export const metadata: Metadata = {
  title: 'NextAuth',
  description: 'Authentication for Next.js',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          href="/assets/auth/next-auth-logo.png"
          sizes="any"
        />
      </head>
      <body>
        <ProviderNextAuth>
          <UserContextProvider>
            <ToasterContext />
            {children}
          </UserContextProvider>
        </ProviderNextAuth>
      </body>
    </html>
  );
}
