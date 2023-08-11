'use client';

import { usePathname } from 'next/navigation';
import { ThemeProvider } from 'next-themes';

import AppBar from './AppBar';
import { ReactNode } from 'react';

const Wrapper = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();

  return (
    <ThemeProvider attribute='class'>
      <main>
        {children}
        {pathname !== '/settings' && pathname !== '/timer' && <AppBar />}
      </main>
    </ThemeProvider>
  );
};

export default Wrapper;
