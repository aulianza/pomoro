/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import { format } from 'date-fns';
import { motion, useAnimation } from 'framer-motion';
import { useEffect, useState } from 'react';
import {
  BiChevronDown as SelectIcon,
  BiTask as TaskIcon,
} from 'react-icons/bi';
import {
  HiChevronDoubleRight as SkipIcon,
  HiPause as PauseIcon,
  HiPlay as StartIcon,
  HiStop as EndIcon,
} from 'react-icons/hi';

import BottomSheet from '@/common/components/BottomSheet';
import { useTimerStore } from '@/common/store/timer';
import TaskListModal from '@/modules/task/components/TaskListModal';

const Timer = () => {
  const {
    activeTask,
    timerMode,
    time,
    isRunning,
    isPaused,
    setStart,
    setPause,
    setEnd,
    transitionToNextMode,
  } = useTimerStore();

  const [isOpen, setOpen] = useState(false);

  const circleControls = useAnimation();

  const handleEndSession = () => {
    setEnd();
    handleResetCircleControls();
  };

  const handleResetCircleControls = () => {
    circleControls.set({ strokeDashoffset: 283 });
  };

  useEffect(() => {
    if (isRunning) {
      circleControls.start({ strokeDashoffset: 0 });
    } else {
      circleControls.stop();
    }
  }, [isRunning]);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning && time > 0) {
      interval = setInterval(() => {
        useTimerStore.setState((state) => ({ time: state.time - 1 }));
      }, 1000);
    } else if (isRunning && time === 0) {
      transitionToNextMode();
      circleControls.set({ strokeDashoffset: 0 });
    }

    return () => clearInterval(interval);
  }, [isRunning, time]);

  useEffect(() => {
    // if (timerMode?.mode === 'focus' && time !== 10) setPause();
    handleEndSession();
  }, []);

  useEffect(() => {
    handleResetCircleControls();
  }, [timerMode]);

  return (
    <>
      <div className='h-screen'>
        <div className='p-5'>
          <div
            onClick={() => {
              setOpen(true);
            }}
            className='flex items-center justify-between border-2 border-dashed border-neutral-500 px-4 py-2 rounded-full cursor-pointer'
          >
            <div className='flex items-center gap-2 '>
              <TaskIcon size={18} />
              {activeTask?.title || 'Select Task...'}
            </div>
            <SelectIcon size={22} />
          </div>
        </div>
        <div className='flex flex-col justify-center items-center'>
          <div className='p-4 rounded text-center'>
            <div className='text-lg mb-10'>{timerMode?.title}</div>
            <div className='relative'>
              <svg
                viewBox='0 0 100 100'
                className='w-72 h-72'
                style={{ transform: 'rotate(-90deg)' }}
              >
                <circle
                  cx='50'
                  cy='50'
                  r='45'
                  fill='transparent'
                  stroke='lightgray'
                  strokeWidth='3'
                />

                <motion.circle
                  cx='50'
                  cy='50'
                  r='45'
                  fill='transparent'
                  stroke='gray'
                  strokeWidth='3'
                  strokeDasharray='283'
                  initial={{ strokeDashoffset: 283 }}
                  animate={circleControls}
                  transition={{ duration: time, ease: 'linear' }}
                />
              </svg>
              <div className='absolute inset-0 flex justify-center items-center'>
                <div className='text-6xl font-bold text-neutral-900 dark:text-neutral-100'>
                  {format(new Date(time * 1000), 'mm:ss')}
                </div>
              </div>
            </div>
          </div>

          <div className='flex flex-col items-center gap-3 mt-5 mb-20 pb-20'>
            <div className='flex gap-2'>
              {!isRunning ? (
                <>
                  <button
                    className='py-2 px-5 rounded-full bg-green-500 text-white flex items-center gap-1 hover:shadow-sm'
                    onClick={setStart}
                  >
                    <StartIcon size={22} />
                    {isPaused ? 'Resume' : 'Start'}
                  </button>
                  <button
                    className='py-2 px-5 rounded-full bg-neutral-200 dark:bg-neutral-700 flex items-center gap-1 hover:shadow-sm'
                    onClick={transitionToNextMode}
                  >
                    <SkipIcon size={22} />
                    Skip
                  </button>
                </>
              ) : (
                <button
                  className='py-2 px-5 rounded-full bg-amber-300 dark:text-neutral-900 flex items-center gap-1 hover:shadow-sm'
                  onClick={setPause}
                >
                  <PauseIcon size={22} />
                  Pause
                </button>
              )}
            </div>

            <div className='flex gap-2'>
              {isRunning ||
                (isPaused && (
                  <button
                    className='py-2 px-5 rounded-full bg-red-500 text-white flex items-center gap-1 hover:shadow-sm'
                    onClick={handleEndSession}
                  >
                    <EndIcon size={22} />
                    End Session
                  </button>
                ))}
            </div>
          </div>
        </div>
      </div>

      <BottomSheet title='Select Task' isOpen={isOpen} onClose={setOpen}>
        <TaskListModal />
      </BottomSheet>
    </>
  );
};

export default Timer;
