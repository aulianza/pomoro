'use client';

import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { BsFillPlayCircleFill as StartIcon } from 'react-icons/bs';

import BottomSheet from '@/common/components/BottomSheet';
import Checkbox from '@/common/components/Checkbox';
import { useTaskStore } from '@/common/store/task';
import { useTimerStore } from '@/common/store/timer';
import { TaskProps } from '@/common/types/task';

import AddEditTask from './AddEditTask';

const TaskItem = ({
  id,
  title,
  note,
  is_completed,
  label,
  pomos,
  due_date,
  start_time,
  end_time,
  created_at,
}: TaskProps) => {
  const { updateTask } = useTaskStore();
  const { activeTask, setActiveTask, setEnd } = useTimerStore();

  const router = useRouter();

  const [isOpen, setOpen] = useState(false);
  const [isCompleted, setCompleted] = useState(false);

  const handleCompleteChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.stopPropagation();

    setCompleted(event.target.checked);

    const updatedTask: TaskProps = {
      is_completed: event.target.checked,
      id,
      title,
      note,
      pomos,
      label,
      due_date,
      start_time,
      end_time,
      created_at,
    };

    updateTask(updatedTask);
  };

  const handleCheckboxClick = (event: React.MouseEvent<HTMLInputElement>) => {
    event.stopPropagation();
  };

  const handleStartTimer = (event: React.MouseEvent) => {
    event.stopPropagation();

    setActiveTask({
      id,
      title,
      note,
      label,
      pomos,
      due_date,
      start_time,
      end_time,
      created_at,
      is_completed: false,
    });

    if (activeTask?.id !== id) setEnd();

    router.push('/timer');
  };

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.keyCode === 27 || event.key === 'Escape') {
        setOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  useEffect(() => {
    setCompleted(is_completed);
  }, [id, is_completed]);

  return (
    <>
      <div
        className='border p-5 rounded-xl shadow-sm bg-white dark:bg-neutral-900 dark:border-neutral-700 cursor-pointer'
        onClick={() => {
          setOpen(true);
        }}
      >
        <div className='flex items-center justify-between'>
          <div className='w-11/12 flex items-center gap-4'>
            <Checkbox
              checked={isCompleted}
              onChange={handleCompleteChange}
              onClick={handleCheckboxClick}
            />
            <div
              className={clsx(
                'text-[15px] dark:text-neutral-200',
                isCompleted &&
                  'line-through text-neutral-600 dark:text-neutral-400',
              )}
            >
              {title}
            </div>
          </div>
          <div className='w-auto flex gap-2 items-center'>
            <StartIcon
              onClick={!isCompleted ? handleStartTimer : null}
              className={clsx(
                'cursor-pointer text-green-600 dark:text-green-400',
                isCompleted &&
                  'cursor-not-allowed text-neutral-300 dark:text-neutral-700',
              )}
              size={20}
            />
          </div>
        </div>
      </div>
      <BottomSheet title='Edit Task' isOpen={isOpen} onClose={setOpen}>
        <AddEditTask
          action='edit'
          id={id}
          title={title}
          isCompleted={isCompleted}
          created_at={created_at}
          note={note}
          pomos={pomos}
          onSave={() => setOpen(false)}
          onStartTimer={handleStartTimer}
        />
      </BottomSheet>
    </>
  );
};

export default TaskItem;
