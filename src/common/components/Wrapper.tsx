'use client';

import { usePathname } from 'next/navigation';
import React from 'react';

import AppBar from './AppBar';

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  return (
    <main>
      {children}
      {pathname !== '/settings' && pathname !== '/timer' && <AppBar />}
    </main>
  );
};

export default Wrapper;
