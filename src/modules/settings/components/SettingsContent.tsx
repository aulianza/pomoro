import ThemeToggle from '@/common/components/ThemeToggle';

const SettingsContent = () => {
  return (
    <div className='p-6 space-y-6 bg-neutral-100 dark:bg-neutral-800 h-screen'>
      <div className='space-y-2'>
        <span className='ml-3 text-sm text-neutral-500'>General</span>
        <div className='p-1 bg-neutral-200 dark:bg-neutral-700 rounded-xl'>
          <div className='flex items-center justify-between p-3'>
            <span>Show Quotes</span>
            <ThemeToggle />
          </div>
        </div>
      </div>

      <div className='space-y-2'>
        <span className='ml-3 text-sm text-neutral-500'>Timer Length</span>
        <div className='p-1 bg-neutral-200 dark:bg-neutral-700 rounded-xl'>
          <div className='flex items-center justify-between p-3'>
            <span>Focus Session</span>
            <div className='text-right text-sm bg-neutral-100 dark:bg-neutral-600 rounded-lg py-1 px-3 cursor-pointer'>
              25 Minutes
            </div>
          </div>
          <div className='flex items-center justify-between p-3'>
            <span>Short Break</span>
            <div className='text-right text-sm bg-neutral-100 dark:bg-neutral-600 rounded-lg py-1 px-3 cursor-pointer'>
              5 Minutes
            </div>
          </div>
          <div className='flex items-center justify-between p-3'>
            <span>Long Break</span>
            <div className='text-right text-sm bg-neutral-100 dark:bg-neutral-600 rounded-lg py-1 px-3 cursor-pointer'>
              15 Minutes
            </div>
          </div>
        </div>
      </div>

      <div className='space-y-2'>
        <span className='ml-3 text-sm text-neutral-500'>Focus Session</span>
        <div className='p-1 bg-neutral-200 dark:bg-neutral-700 rounded-xl'>
          <div className='flex items-center justify-between p-3'>
            <span>Sessions Per Round</span>
            <div className='text-right text-sm bg-neutral-100 dark:bg-neutral-600 rounded-lg py-1 px-3 cursor-pointer'>
              4 Sessions
            </div>
          </div>
        </div>
      </div>

      <div className='space-y-2'>
        <span className='ml-3 text-sm text-neutral-500'>Theme</span>
        <div className='p-1 bg-neutral-200 dark:bg-neutral-700 rounded-xl'>
          <div className='flex items-center justify-between p-3'>
            <span>Dark Mode</span>
            <ThemeToggle />
          </div>
        </div>
      </div>

      <div className='space-y-2'>
        <span className='ml-3 text-sm text-neutral-500'>Help & Feedback</span>
        <div className='p-1 bg-neutral-200 dark:bg-neutral-700 rounded-xl'>
          <div className='flex items-center justify-between p-3 cursor-pointer'>
            About Pomoro
          </div>
          <div className='flex items-center justify-between p-3 cursor-pointer'>
            Support & Feedback
          </div>
          <div className='flex items-center justify-between p-3 cursor-pointer'>
            Bug Report
          </div>
        </div>
      </div>

      <div className='text-center text-sm space-y-2 pb-10 text-neutral-400 dark:text-neutral-600'>
        Pomoro v1.0 Beta
      </div>
    </div>
  );
};

export default SettingsContent;
