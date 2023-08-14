'use client';

import { useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import { useEffect } from 'react';
import { BiSolidChevronLeft as BackIcon } from 'react-icons/bi';

import SettingsContent from './SettingsContent';

const Settings = () => {
  const router = useRouter();
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

    themeColorMeta.content = resolvedTheme === 'dark' ? '#262626' : '#fbfbfb';
  }, [resolvedTheme]);

  return (
    <>
      <div className='fixed w-full max-w-[480px] py-4 px-6 backdrop-blur-md'>
        <div className='flex items-center gap-3 hover:gap-4 transition-all duration-300'>
          <div
            className='border border-neutral-400 p-2 rounded-full cursor-pointer text-neutral-700 dark:text-neutral-200 cursor-pointer '
            onClick={() => router.back()}
          >
            <BackIcon size={20} />
          </div>
          <div className='text-lg text-medium text-neutral-700 dark:text-neutral-200'>
            Settings
          </div>
        </div>
      </div>
      <div className='pt-14'>
        <SettingsContent />
      </div>
    </>
  );
};

export default Settings;
