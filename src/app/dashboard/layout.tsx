import type { Metadata } from 'next';

import { DashboardHeader } from '@/components/dashboard/header';

export const metadata: Metadata = {
  title: 'Dashboard',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <DashboardHeader />
      {children}
      <div id="modal-root" />
    </div>
  );
}
