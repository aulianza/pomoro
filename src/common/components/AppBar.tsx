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
    <div className='fixed bottom-0 w-full max-w-[480px] mx-auto  backdrop-blur-'>
      <div className='flex gap-1 justify-center py-2 px-0 mx-4 md:mx-16 mb-6 rounded-full border dark:border-neutral-600 bg-white dark:bg-neutral-900 shadow-lg text-neutral-600 dark:text-neutral-400'>
        {MENU.map((menu) => (
          <Link href={menu?.path} key={menu?.name}>
            <button
              className={clsx(
                'py-3 px-5 flex items-center cursor-pointer gap-1 rounded-full ',
                'hover:text-neutral-700 dark:hover:text-neutral-300',
                {
                  'bg-neutral-200 dark:bg-neutral-600 text-neutral-800 dark:text-neutral-50':
                    pathname === menu?.path,
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
