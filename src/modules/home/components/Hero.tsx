import Link from 'next/link';
import { LuSettings as SettingsIcon } from 'react-icons/lu';

import ThemeToggle from '@/common/components/ThemeToggle';
import { getTimeOfDay } from '@/common/helpers';

import Quotes from './Quotes';

const Hero = () => {
  const timeOfDay = getTimeOfDay();

  return (
    <div className='pt-6 pb-8 px-6 space-y-6 h-auto bg-white dark:bg-neutral-900'>
      <div className='flex justify-between items-center'>
        <div className='flex flex-col'>
          <span>{timeOfDay}, Ryan</span>
          <span className='block text-sm font-normal text-neutral-500'>
            {new Date().toLocaleDateString('en-US', {
              weekday: 'long',
              month: 'long',
              day: 'numeric',
            })}
          </span>
        </div>
        <div className='flex items-center gap-3'>
          <ThemeToggle />
          <Link href='/settings'>
            <div className='border border-neutral-400 p-2 rounded-full cursor-pointer text-neutral-600 dark:text-neutral-400 hover:border-neutral-500 hover:text-neutral-700'>
              <SettingsIcon size={22} />
            </div>
          </Link>
        </div>
      </div>
      <Quotes />
    </div>
  );
};

export default Hero;
