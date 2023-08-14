import clsx from 'clsx';
import type { Metadata } from 'next';
import { Sora } from 'next/font/google';

import './globals.css';

import { Providers } from '@/common/components/Providers';

const sora = Sora({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Pomoro - Pomodoro & Todo List',
  description: 'Pomoro by aulianza',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' suppressHydrationWarning>
      <head>
        <link rel='icon' href='/images/favicon.png' sizes='<generated>' />
        <link rel='manifest' href='/manifest.json' />
      </head>
      <body
        className={clsx(
          'bg-neutral-50 dark:bg-neutral-800 md:bg-neutral-50 md:dark:bg-neutral-50',
          sora.className,
        )}
      >
        <Providers>
          <div className='max-w-[480px] mx-auto bg-neutral-50 dark:bg-neutral-800 md:shadow-md md:min-h-screen'>
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
