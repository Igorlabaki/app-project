import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'NextAuth - Forgot Password',
  description: 'Authentication for Next.js',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="flex bg-slate-800 min-h-screen justify-center items-center flex-col p-5 md:p-0">
      {children}
    </section>
  );
}
