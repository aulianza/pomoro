/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  BiChevronDown as SelectIcon,
  BiTask as TaskIcon,
} from 'react-icons/bi';
import { BiSolidChevronLeft as BackIcon } from 'react-icons/bi';
import { GiTomato as TomatoIcon } from 'react-icons/gi';
import { LuSettings as SettingsIcon } from 'react-icons/lu';

import BottomSheet from '@/common/components/BottomSheet';
import { useTimerModeStore, useTimerStore } from '@/common/store/timer';
import AddEditTask from '@/modules/task/components/AddEditTask';
import TaskListModal from '@/modules/task/components/TaskListModal';

import TimerAction from './TimerAction';
import TimerAnimation from './TimerAnimation';
import TimerCountdown from './TimerCountdown';
import TimerSettings from './TimerSettings';

const modeToBackgroundColor: { [key: string]: string } = {
  focus: 'bg-lime-100',
  shortBreak: 'bg-sky-100',
  longBreak: 'bg-fuchsia-100',
};

const Timer = () => {
  const {
    activeTask,
    currentTimerMode,
    isRunning,
    setPause,
    transitionToNextMode,
  } = useTimerStore();

  const { timerMode } = useTimerModeStore();

  const [isOpenTaskListModal, setOpenTaskListModal] = useState(false);
  const [isOpenTaskCreateModal, setOpenTaskCreateModal] = useState(false);
  const [isOpenTimerSettingsModal, setOpenTimerSettingsModal] = useState(false);
  const [isMounted, setMounted] = useState(false);

  const router = useRouter();

  const modeTimes: Record<string, number> = timerMode?.reduce(
    (item, modeObj) => {
      item[modeObj.mode] = modeObj?.time;
      return item;
    },
    {} as Record<string, number>,
  );

  const dynamicBgClass = modeToBackgroundColor[currentTimerMode.mode];

  const handleCreateNewTask = () => {
    setOpenTaskListModal(false);
    setOpenTaskCreateModal(true);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning && currentTimerMode.time > 0) {
      interval = setInterval(() => {
        useTimerStore.setState((state) => {
          const newTime = state.currentTimerMode.time - 1 / 60;
          return {
            currentTimerMode: {
              ...state.currentTimerMode,
              time: newTime,
            },
          };
        });
      }, 1000);
    } else if (isRunning && currentTimerMode.time === 0) {
      transitionToNextMode();
    }

    return () => clearInterval(interval);
  }, [isRunning, currentTimerMode]);

  useEffect(() => {
    const currentMode = currentTimerMode?.mode;
    const currentTime = currentTimerMode?.time;

    if (currentMode && modeTimes[currentMode] !== currentTime) {
      setPause();
    }
  }, []);

  useEffect(() => {
    let themeColorMeta = document.querySelector(
      'meta[name="theme-color"]',
    ) as HTMLMetaElement;

    if (!themeColorMeta) {
      themeColorMeta = document.createElement('meta');
      themeColorMeta.name = 'theme-color';
      document.head.appendChild(themeColorMeta);
    }

    let themeColor = '#ebfccb';

    if (currentTimerMode.mode === 'focus') {
      themeColor = '#ebfccb';
    } else if (currentTimerMode.mode === 'shortBreak') {
      themeColor = '#e0f2fe';
    } else if (currentTimerMode.mode === 'longBreak') {
      themeColor = '#fae8ff';
    }

    themeColorMeta.content = themeColor;
  }, [activeTask, isRunning, currentTimerMode]);

  useEffect(() => {
    setMounted(true);
  }, [activeTask, currentTimerMode]);

  if (!isMounted) return null;

  return (
    <div className={clsx(dynamicBgClass, 'h-screen flex flex-col')}>
      <div className='flex items-center gap-3 justify-between p-5'>
        <div
          onClick={() => {
            setOpenTaskListModal(true);
          }}
          className='flex flex-grow items-center justify-between text-neutral-700 border-2 border-dashed border-neutral-500 px-4 py-2 rounded-full cursor-pointer'
        >
          <div className='flex items-center gap-2'>
            <TaskIcon size={18} />
            <div className='truncate w-48 md:w-72'>
              {activeTask?.title || 'Select Task...'}
            </div>
          </div>
          <SelectIcon size={22} />
        </div>
        <div
          onClick={() => {
            setOpenTimerSettingsModal(true);
          }}
          className='flex items-center border-2 border-dot border-neutral-500 p-2 rounded-full cursor-pointer text-neutral-700  hover:border-neutral-600 hover:text-neutral-800'
        >
          <SettingsIcon size={24} />
        </div>
      </div>

      <div className='flex-grow flex flex-col justify-center items-center'>
        <div className='p-4 rounded text-center'>
          <div className='text-xl mb-5 text-neutral-800'>
            {currentTimerMode?.title}
          </div>

          {activeTask?.pomos !== undefined && activeTask?.pomos >= 0 && (
            <div className='flex justify-center items-center gap-1 text-neutral-700'>
              <span className=''>Pomodoro :</span>
              <div className='flex items-center gap-1'>
                {activeTask?.pomos}
                <TomatoIcon size={20} className='text-red-700' />
              </div>
            </div>
          )}

          <TimerAnimation />
          <TimerCountdown time={currentTimerMode?.time} />
        </div>

        <TimerAction onModeChange={transitionToNextMode} />
      </div>

      <div
        className='mb-16 flex items-center justify-center cursor-pointer gap-3 hover:gap-4 transition-all duration-300'
        onClick={() => router.back()}
      >
        <div className='border border-neutral-400 p-2 rounded-full cursor-pointer text-neutral-700'>
          <BackIcon size={20} />
        </div>
        <div className='text-neutral-700'>Back</div>
      </div>

      <BottomSheet
        title='Select Task'
        isOpen={isOpenTaskListModal}
        onClose={setOpenTaskListModal}
      >
        <TaskListModal
          onClose={() => setOpenTaskListModal(false)}
          onCreateNewTask={() => handleCreateNewTask()}
        />
      </BottomSheet>

      <BottomSheet
        title='Timer Settings'
        isOpen={isOpenTimerSettingsModal}
        onClose={setOpenTimerSettingsModal}
      >
        <div className='p-6 space-y-6'>
          <TimerSettings />
        </div>
      </BottomSheet>

      <BottomSheet
        title='Add New Task'
        isOpen={isOpenTaskCreateModal}
        onClose={setOpenTaskCreateModal}
      >
        <AddEditTask
          action='add'
          onSave={() => setOpenTaskCreateModal(false)}
        />
      </BottomSheet>
    </div>
  );
};

export default Timer;
