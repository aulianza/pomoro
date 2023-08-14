'use client';

import { useTheme } from 'next-themes';
import { useCallback, useEffect, useState } from 'react';

import Toggle from './Toggle';

const ThemeToggle = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const [themeColor, setThemeColor] = useState<string | undefined>(undefined);
  const [isChecked, setChecked] = useState(resolvedTheme === 'dark');

  const handleChangeTheme = useCallback(() => {
    setTheme(resolvedTheme === 'light' ? 'dark' : 'light');
    setChecked(!isChecked);
  }, [resolvedTheme, setTheme, isChecked]);

  useEffect(() => {
    setThemeColor(resolvedTheme);
  }, [resolvedTheme]);

  if (!themeColor) return null;

  return <Toggle isChecked={isChecked} onChecked={handleChangeTheme} />;
};

export default ThemeToggle;
