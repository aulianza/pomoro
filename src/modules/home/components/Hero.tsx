import Link from 'next/link';
import { LuSettings as SettingsIcon } from 'react-icons/lu';

import { getFormattedDate, getTimeOfDay } from '@/common/helpers';

import Quotes from './Quotes';

const Hero = () => {
  const timeOfDay = getTimeOfDay();
  const currentDate = getFormattedDate();

  const userName = 'Ryan';
  const greetings = userName
    ? `${timeOfDay}, ${userName}!`
    : `Hi,  ${timeOfDay}!`;

  return (
    <>
      <header className='sticky top-0 z-50'>
        <div className='py-5 px-6 space-y-6 h-auto bg-white dark:bg-neutral-900'>
          <div className='flex justify-between items-center'>
            <div className='flex flex-col'>
              <span>{greetings}</span>
              <span className='block text-sm font-normal text-neutral-500'>
                {currentDate}
              </span>
            </div>
            <div className='flex items-center gap-3'>
              <Link href='/settings'>
                <div className='border border-neutral-400 p-2 rounded-full cursor-pointer text-neutral-600 dark:text-neutral-400 hover:border-neutral-500 hover:text-neutral-700'>
                  <SettingsIcon size={22} />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </header>
      <div className='px-6 pt-3 pb-8 bg-white dark:bg-neutral-900'>
        <Quotes />
      </div>
    </>
  );
};

export default Hero;
