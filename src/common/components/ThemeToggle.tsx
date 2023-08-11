'use client';

import clsx from 'clsx';
import { useTheme } from 'next-themes';
import { useCallback, useEffect, useState } from 'react';
import { BiMoon, BiSun } from 'react-icons/bi';

const ThemeToggle = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const [themeColor, setThemeColor] = useState<string | undefined>(undefined);

  const handleChangeTheme = useCallback(() => {
    setTheme(resolvedTheme === 'light' ? 'dark' : 'light');
  }, [resolvedTheme, setTheme]);

  useEffect(() => {
    setThemeColor(resolvedTheme);
  }, [resolvedTheme]);

  if (!themeColor) return null;

  return (
    <button
      className={clsx(
        '!p-2 border border-neutral-400',
        'text-neutral-600 dark:text-neutral-400',
        'rounded-full transition hover:rotate-45',
        'transition-all duration-300',
      )}
      onClick={handleChangeTheme}
    >
      {themeColor === 'light' ? <BiMoon size={22} /> : <BiSun size={22} />}
    </button>
  );
};

export default ThemeToggle;
