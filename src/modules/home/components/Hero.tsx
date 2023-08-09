import Link from 'next/link';
import { BsSun as SunIcon } from 'react-icons/bs';
import { HiOutlineLocationMarker as LocationIcon } from 'react-icons/hi';
import { LuSettings as SettingsIcon } from 'react-icons/lu';

const Hero = () => {
  return (
    <div className='pt-6 pb-8 px-6 space-y-6 h-auto bg-neutral-800 text-white'>
      <div className='flex justify-between items-center'>
        <div className='flex gap-2 items-center text-neutral-400'>
          <LocationIcon size={18} />
          <span>Jakarta, Indonesia</span>
        </div>
        <div className='flex items-center gap-3'>
          <Link href='/settings'>
            <div className='border border-neutral-600 p-2 rounded-full cursor-pointer text-neutral-300 hover:border-neutral-500 hover:text-neutral-50'>
              <SettingsIcon size={22} />
            </div>
          </Link>
        </div>
      </div>
      <div className='space-y-2'>
        <h2 className='text-3xl'>Hello Ryan</h2>
        <p className='text-neutral-400 text-sm pb-3'>
          What are your task today?
        </p>
      </div>
      <div className='flex items-center justify-between py-4 px-5 bg-neutral-700 rounded-2xl'>
        <div className='flex items-center gap-3'>
          <div className='bg-white text-black p-3 rounded-full'>
            <SunIcon size={22} />
          </div>
          <div>
            <div className='text-sm text-neutral-300'>December 30, 2023</div>
            <div className='font-medium'>Sunny</div>
          </div>
        </div>
        <div className='text-xl'>18 &#8451;</div>
      </div>
    </div>
  );
};

export default Hero;
