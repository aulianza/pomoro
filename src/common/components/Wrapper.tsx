'use client';

import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import { ReactNode, useEffect } from 'react';

import AppBar from './AppBar';

const Wrapper = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    let themeColorMeta = document.querySelector(
      'meta[name="theme-color"]',
    ) as HTMLMetaElement;

    if (!themeColorMeta) {
      themeColorMeta = document.createElement('meta');
      themeColorMeta.name = 'theme-color';
      document.head.appendChild(themeColorMeta);
    }

    themeColorMeta.content = resolvedTheme === 'dark' ? '#171717' : '#fff';
  }, [resolvedTheme]);

  return (
    <main>
      {children}
      {pathname !== '/settings' && pathname !== '/timer' && <AppBar />}
    </main>
  );
};

export default Wrapper;
