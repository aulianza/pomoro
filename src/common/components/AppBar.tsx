'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';
import {
  BiBarChartAlt2 as ReportIcon,
  BiHomeSmile as HomeIcon,
} from 'react-icons/bi';
import { LuTimer as TimerIcon } from 'react-icons/lu';

interface MenuProps {
  name: string;
  icon: ReactNode;
  path: string;
}

const iconSize: number = 18;

const MENU: MenuProps[] = [
  {
    name: 'Home',
    icon: <HomeIcon size={iconSize} />,
    path: '/',
  },
  {
    name: 'Timer',
    icon: <TimerIcon size={iconSize} />,
    path: '/timer',
  },
  {
    name: 'Report',
    icon: <ReportIcon size={iconSize} />,
    path: '/report',
  },
];

const AppBar = () => {
  const pathname = usePathname();

  return (
    <div className='shadow-md fixed bottom-0 w-full py-3 px-5 max-w-[480px] mx-auto bg-neutral-100'>
      <div className='flex gap-1 justify-evenly'>
        {MENU.map((menu) => (
          <Link href={menu?.path} key={menu?.name}>
            <button
              className={clsx(
                'py-2 px-4 flex items-center cursor-pointer gap-1 rounded-full text-neutral-600 ',
                'hover:text-neutral-700',
                'transition-all duration-300',
                {
                  'bg-neutral-200 text-neutral-800': pathname === menu?.path,
                },
              )}
            >
              <div>{menu?.icon}</div>
              <div className='text-sm font-medium'>{menu?.name}</div>
            </button>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AppBar;
