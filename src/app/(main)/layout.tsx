import type { ReactNode } from 'react';
import AppShell from '@/components/AppShell/AppShell';

type MainLayoutProps = {
  children: ReactNode;
};

export default function MainLayout({ children }: MainLayoutProps) {
  return <AppShell>{children}</AppShell>;
}
