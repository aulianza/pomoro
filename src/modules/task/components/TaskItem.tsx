'use client';

import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { BsFillPlayCircleFill as StartIcon } from 'react-icons/bs';

import BottomSheet from '@/common/components/BottomSheet';
import Checkbox from '@/common/components/Checkbox';
import { useTaskStore } from '@/common/store/task';
import { TaskProps } from '@/common/types/task';

import AddEditTask from './AddEditTask';

const TaskItem = ({
  id,
  title,
  note,
  is_completed,
  label,
  due_date,
  start_time,
  end_time,
  created_at,
}: TaskProps) => {
  const { updateTask } = useTaskStore();

  const [isOpen, setOpen] = useState(false);
  const [isCompleted, setCompleted] = useState(is_completed);

  const handleCompleteChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.stopPropagation();

    setCompleted(event.target.checked);

    const updatedTask: TaskProps = {
      is_completed: event.target.checked,
      id,
      title,
      note,
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

  const handleStartTimer = (event: React.MouseEvent<SVGSVGElement>) => {
    event.stopPropagation();

    console.log('start timer');
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
              onClick={handleStartTimer}
              className='cursor-pointer text-green-600 dark:text-green-400'
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
          note={note}
          onSave={() => setOpen(false)}
        />
      </BottomSheet>
    </>
  );
};

export default TaskItem;
