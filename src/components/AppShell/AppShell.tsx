import type { ReactNode } from 'react';
import Bar from '@/components/Bar/Bar';
import Nav from '@/components/Nav/Nav';
import Sidebar from '@/components/Sidebar/Sidebar';
import styles from './AppShell.module.css';

type AppShellProps = {
  children: ReactNode;
};

export default function AppShell({ children }: AppShellProps) {
  return (
    <div className={styles.wrapper}>
      <div className="container">
        <main className={styles.main}>
          <Nav />
          {children}
          <Sidebar />
        </main>
        <Bar />
        <footer className={styles.footer}></footer>
      </div>
    </div>
  );
}
