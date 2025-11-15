import { ReactNode } from 'react';
import { Header } from './Header';

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen bg-bg-primary">
      <Header />
      <main className="pt-20">{children}</main>
    </div>
  );
}
