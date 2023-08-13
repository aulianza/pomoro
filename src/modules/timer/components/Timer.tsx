/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import {
  BiChevronDown as SelectIcon,
  BiTask as TaskIcon,
} from 'react-icons/bi';

import BottomSheet from '@/common/components/BottomSheet';
import { useTimerStore } from '@/common/store/timer';
import TaskListModal from '@/modules/task/components/TaskListModal';

import TimerAction from './TimerAction';
import TimerAnimation from './TimerAnimation';

const Timer = () => {
  const {
    activeTask,
    currentTimerMode,
    isRunning,
    setPause,
    transitionToNextMode,
  } = useTimerStore();
  const [isOpen, setOpen] = useState(false);
  const [isMounted, setMounted] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning && currentTimerMode.time > 0) {
      interval = setInterval(() => {
        useTimerStore.setState((state) => ({
          currentTimerMode: {
            ...state.currentTimerMode,
            time: state.currentTimerMode.time - 1,
          },
        }));
      }, 1000);
    } else if (isRunning && currentTimerMode.time === 0) {
      transitionToNextMode();
    }

    return () => clearInterval(interval);
  }, [isRunning, currentTimerMode]);

  useEffect(() => {
    if (currentTimerMode?.mode === 'focus' && currentTimerMode?.time !== 1500)
      setPause();
    if (
      currentTimerMode?.mode === 'shortBreak' &&
      currentTimerMode?.time !== 300
    )
      setPause();
  }, []);

  useEffect(() => {
    setMounted(true);
  }, [activeTask, currentTimerMode]);

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
      <div className='flex flex-col justify-center items-center space-y-6 my-5'>
        <div className='p-4 rounded text-center'>
          <div className='text-lg mb-5'>{currentTimerMode?.title}</div>
          <div className='text-lg mb-2'>Pomos : {activeTask?.pomos}</div>

          <TimerAnimation />
          <div className='text-6xl font-bold text-neutral-900 dark:text-neutral-100'>
            {format(new Date(currentTimerMode.time * 1000), 'mm:ss')}
          </div>
        </div>

        <TimerAction onModeChange={transitionToNextMode} />
      </div>

      <BottomSheet title='Select Task' isOpen={isOpen} onClose={setOpen}>
        <TaskListModal onClose={() => setOpen(false)} />
      </BottomSheet>
    </>
  );
};

export default Timer;
