import clsx from 'clsx';
import type { Metadata } from 'next';
import { Sora } from 'next/font/google';

import './globals.css';

const sora = Sora({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body
        suppressHydrationWarning={true}
        className={clsx('md:bg-neutral-50', sora.className)}
      >
        <div className='max-w-[480px] mx-auto bg-neutral-50 dark:bg-neutral-900 md:shadow-md h-screen'>
          {children}
        </div>
      </body>
    </html>
  );
}
