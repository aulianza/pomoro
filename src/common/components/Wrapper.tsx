'use client';

import Head from 'next/head';
import { usePathname } from 'next/navigation';
import { ThemeProvider, useTheme } from 'next-themes';
import React from 'react';

import AppBar from './AppBar';

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const { resolvedTheme } = useTheme();

  return (
    <ThemeProvider attribute='class'>
      <Head>
        <meta
          name='theme-color'
          content={resolvedTheme === 'dark' ? '#171717' : '#ffffff'}
        />
      </Head>
      <main>
        {children}
        {pathname !== '/settings' && pathname !== '/timer' && <AppBar />}
      </main>
    </ThemeProvider>
  );
};

export default Wrapper;
