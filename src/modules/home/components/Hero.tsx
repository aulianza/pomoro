import Link from 'next/link';
import { BiLeaf as LogoIcon } from 'react-icons/bi';
import { LuSettings as SettingsIcon } from 'react-icons/lu';

const Hero = () => {
  return (
    <>
      <header className='sticky top-0 z-50'>
        <div className='py-4 px-6 space-y-6 h-auto bg-white dark:bg-neutral-900'>
          <div className='flex justify-between items-center'>
            <div className='flex gap-2 items-center text-emerald-500 dark:text-emerald-400'>
              <LogoIcon size={28} />
              <h1 className='text-2xl'>Pomoro</h1>
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
    </>
  );
};

export default Hero;
