'use client';

import { usePathname } from 'next/navigation';
import { ThemeProvider, useTheme } from 'next-themes';
import React from 'react';

import AppBar from './AppBar';

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const { resolvedTheme } = useTheme();

  return (
    <ThemeProvider attribute='class'>
      <head>
        <meta
          name='theme-color'
          content={resolvedTheme === 'dark' ? '#171717' : '#ffffff'}
        />
      </head>
      <main>
        {children}
        {pathname !== '/settings' && pathname !== '/timer' && <AppBar />}
      </main>
    </ThemeProvider>
  );
};

export default Wrapper;
