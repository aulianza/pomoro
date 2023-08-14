'use client';

import { useTheme } from 'next-themes';
import { useEffect } from 'react';

import Hero from './Hero';

const Home = () => {
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

  return <Hero />;
};

export default Home;
