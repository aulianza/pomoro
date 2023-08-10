import Link from 'next/link';
import { BsQuote as QuoteIcon, BsSun as SunIcon } from 'react-icons/bs';
import { LuSettings as SettingsIcon } from 'react-icons/lu';

import ThemeToggle from '@/common/components/ThemeToggle';

const Hero = () => {
  return (
    <div className='pt-6 pb-8 px-6 space-y-6 h-auto bg-white dark:bg-neutral-900'>
      <div className='flex justify-between items-center'>
        <div>
          <div className='flex gap-2 items-center text-neutral-600 dark:text-neutral-300'>
            <SunIcon size={18} />
            <span>Good Morning, Ryan</span>
          </div>
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
      <div className='flex items-center justify-between py-4 px-5 bg-neutral-50 dark:bg-neutral-800 border dark:border-neutral-700 rounded-2xl'>
        <div className='flex items-center gap-4'>
          <div className='bg-white dark:bg-neutral-700 p-3 rounded-full'>
            <QuoteIcon size={20} />
          </div>
          <div>
            <div className='text-neutral-700 dark:text-neutral-200'>
              Seize the day, making every moment count
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
