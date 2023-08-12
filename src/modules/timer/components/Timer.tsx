/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { format } from 'date-fns';
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
import LottiePlayer from '@/common/components/LottiePlayer';
import { useTimerStore } from '@/common/store/timer';
import TaskListModal from '@/modules/task/components/TaskListModal';

const timerAnimationData =
  'https://lottie.host/9e24455a-3579-47d3-9e86-816a3935bcf8/GPOFCIoVME.json';

const Timer = () => {
  const {
    activeTask,
    timerMode,
    time,
    isRunning,
    isPaused,
    isEnd,
    setStart,
    setPause,
    setEnd,
    transitionToNextMode,
  } = useTimerStore();

  const [isOpen, setOpen] = useState(false);
  const [isMounted, setMounted] = useState(false);
  const [animationStatus, setAnimationStatus] = useState<
    'play' | 'pause' | 'stop'
  >('stop');

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning && time > 0) {
      interval = setInterval(() => {
        useTimerStore.setState((state) => ({ time: state.time - 1 }));
      }, 1000);
    } else if (isRunning && time === 0) {
      transitionToNextMode();
    }

    return () => clearInterval(interval);
  }, [isRunning, time]);

  useEffect(() => {
    if (timerMode?.mode === 'focus' && time !== 10) setPause();
    if (timerMode?.mode === 'shortBreak' && time !== 5) setPause();
  }, []);

  useEffect(() => {
    setMounted(true);
  }, [activeTask, timerMode, time]);

  useEffect(() => {
    if (isRunning) {
      setAnimationStatus('play');
    } else if (isPaused) {
      setAnimationStatus('pause');
    } else if (isEnd) {
      setAnimationStatus('stop');
    }
  }, [isRunning, isPaused, isEnd]);

  if (!isMounted) return null;

  return (
    <>
      <div className='p-5'>
        <div
          onClick={() => {
            setOpen(true);
          }}
          className='flex items-center justify-between border-2 border-dashed border-neutral-500 px-4 py-2 rounded-full cursor-pointer'
        >
          <div className='flex items-center gap-2'>
            <TaskIcon size={18} />
            {activeTask?.title || 'Select Task...'}
          </div>
          <SelectIcon size={22} />
        </div>
      </div>
      <div className='flex flex-col justify-center items-center space-y-6 my-10'>
        <div className='p-4 rounded text-center'>
          <div className='text-lg mb-5'>{timerMode?.title}</div>
          <LottiePlayer
            status={animationStatus}
            autoplay={false}
            src={timerAnimationData}
            width='250px'
            height='250px'
          />
          <div className='text-6xl font-bold text-neutral-900 dark:text-neutral-100'>
            {format(new Date(time * 1000), 'mm:ss')}
          </div>
        </div>

        <div className='flex flex-col items-center gap-3 mt-5 mb-20 pb-32'>
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
                  onClick={setEnd}
                >
                  <EndIcon size={22} />
                  End Session
                </button>
              ))}
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
