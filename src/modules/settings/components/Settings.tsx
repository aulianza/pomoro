'use client';

import { useRouter } from 'next/navigation';
import { BiSolidChevronLeft as BackIcon } from 'react-icons/bi';

import SettingsContent from './SettingsContent';

const Settings = () => {
  const router = useRouter();

  return (
    <>
      <div className='fixed w-full max-w-[480px] py-4 px-6 backdrop-blur-md'>
        <div
          className='flex items-center cursor-pointer gap-3 hover:gap-4 transition-all duration-300'
          onClick={() => router.back()}
        >
          <div className='border border-neutral-400 p-2 rounded-full cursor-pointer text-neutral-700 dark:text-neutral-200'>
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
