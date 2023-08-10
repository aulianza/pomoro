import Link from 'next/link';
import { BsQuote as QuoteIcon, BsSun as SunIcon } from 'react-icons/bs';
import { LuSettings as SettingsIcon } from 'react-icons/lu';

const Hero = () => {
  return (
    <div className='pt-6 pb-8 px-6 space-y-6 h-auto bg-white'>
      <div className='flex justify-between items-center'>
        <div>
          <div className='flex gap-2 items-center text-neutral-600'>
            <SunIcon size={18} />
            <span>Good Morning, Ryan</span>
          </div>
        </div>
        <div className='flex items-center gap-3'>
          <Link href='/settings'>
            <div className='border border-neutral-400 p-2 rounded-full cursor-pointer text-neutral-600 hover:border-neutral-500 hover:text-neutral-700'>
              <SettingsIcon size={22} />
            </div>
          </Link>
        </div>
      </div>
      <div className='flex items-center justify-between py-4 px-5 bg-neutral-50 border rounded-2xl'>
        <div className='flex items-center gap-4'>
          <div className='bg-white p-3 rounded-full'>
            <QuoteIcon size={20} />
          </div>
          <div>
            <div className='text-neutral-700'>
              Seize the day, making every moment count
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
