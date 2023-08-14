'use client';

import { useEffect, useState } from 'react';

import BottomSheet from '@/common/components/BottomSheet';
import { useTimerModeStore, useTimerStore } from '@/common/store/timer';
import { TimerModeProps } from '@/common/types/timer';

import TimerLengthModal from './TimerLengthModal';

const TimerSettings = () => {
  const { timerMode, setTimerMode } = useTimerModeStore();
  const { interval, currentTimerMode, setCurrentTimerMode } = useTimerStore();

  const [isMounted, setMounted] = useState(false);
  const [isOpenTimerChangeModal, setOpenTimerChangeModal] = useState(false);
  const [timerChangeModalTitle, setTimerChangeModalTitle] = useState('');
  const [selectedMode, setSelectedMode] = useState<TimerModeProps>();

  const handleTimeChangeModal = (mode: TimerModeProps) => {
    setTimerChangeModalTitle(`${mode?.title} Timer`);
    setSelectedMode(mode);
    setOpenTimerChangeModal(true);
  };

  const handleTimeChange = (newTime: number) => {
    const modeData = timerMode.find(
      (modeData) => modeData.mode === selectedMode?.mode,
    );

    if (newTime > 0 && modeData) {
      const updatedMode: TimerModeProps = {
        mode: modeData.mode,
        title: modeData.title,
        time: newTime,
      };
      setTimerMode(updatedMode);

      if (currentTimerMode.mode === selectedMode?.mode) {
        setCurrentTimerMode(updatedMode);
      }
    }

    setOpenTimerChangeModal(false);
  };

  useEffect(() => {
    setMounted(true);
  }, [timerMode]);

  if (!isMounted) return null;
  return (
    <>
      <div className='space-y-2'>
        <span className='ml-3 text-sm text-neutral-500'>Timer Length</span>
        <div className='p-1 bg-neutral-100 dark:bg-neutral-700 rounded-xl'>
          {timerMode?.map((item, index) => (
            <div key={index} className='flex items-center justify-between p-3'>
              <span>
                {item?.title} {item?.title === 'Focus' && 'Session'}
              </span>
              <div
                onClick={() => handleTimeChangeModal(item)}
                className='text-right text-sm bg-neutral-200 dark:bg-neutral-600 rounded-lg py-1 px-3 cursor-pointer'
              >
                {item?.time} Minutes
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className='space-y-2'>
        <span className='ml-3 text-sm text-neutral-500'>Focus Session</span>
        <div className='p-1 bg-neutral-100 dark:bg-neutral-700 rounded-xl'>
          <div className='flex items-center justify-between p-3'>
            <span>Sessions Per Round</span>
            <div className='text-right text-sm bg-neutral-200 dark:bg-neutral-600 rounded-lg py-1 px-3 cursor-pointer'>
              {interval} Sessions
            </div>
          </div>
        </div>
      </div>

      <BottomSheet
        title={timerChangeModalTitle}
        isOpen={isOpenTimerChangeModal}
        onClose={setOpenTimerChangeModal}
      >
        <TimerLengthModal
          selectedTime={selectedMode?.time}
          onTimeChange={handleTimeChange}
        />
      </BottomSheet>
    </>
  );
};

export default TimerSettings;
