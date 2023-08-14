'use client';

import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

import AppBar from './AppBar';

const Wrapper = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();

  return (
    <main>
      {children}
      {pathname !== '/settings' && pathname !== '/timer' && <AppBar />}
    </main>
  );
};

export default Wrapper;
