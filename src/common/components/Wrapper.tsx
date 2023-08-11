'use client';

import { usePathname } from 'next/navigation';
import { ThemeProvider } from 'next-themes';
import React from 'react';

import AppBar from './AppBar';

const Wrapper = ({ children }: { children: React.ReactNode }) => {
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
