'use client';

import { useEffect, useState } from 'react';
import { BsQuote as QuoteIcon } from 'react-icons/bs';

import { QUOTES } from '@/common/constants/quotes';

const Quotes = () => {
  const [quote, setQuote] = useState('');
  const [loading, setLoading] = useState(true);

  const getRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * QUOTES.length);
    return QUOTES[randomIndex];
  };

  useEffect(() => {
    const randomQuote = getRandomQuote();
    setTimeout(() => {
      setQuote(randomQuote);
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div className='flex items-center justify-between py-4 px-5 bg-neutral-50 dark:bg-neutral-800 border dark:border-neutral-700 rounded-2xl'>
      <div className='flex items-center gap-2'>
        <div className='p-1'>
          <QuoteIcon size={18} />
        </div>
        <div>
          <div className='text-neutral-700 dark:text-neutral-200 text-[15px]'>
            {loading ? (
              <span className='text-neutral-600 dark:text-neutral-400'>
                Preparing inspiration...
              </span>
            ) : (
              quote
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quotes;
