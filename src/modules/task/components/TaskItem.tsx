'use client';

import clsx from 'clsx';
import { useState } from 'react';

import Checkbox from '@/common/components/Checkbox';
import { useTaskStore } from '@/common/store/task';
import { TaskProps } from '@/common/types/task';

const TaskItem = ({
  id,
  title,
  description,
  is_completed,
  label,
  due_date,
  start_time,
  end_time,
  created_at,
}: TaskProps) => {
  const { updateTask } = useTaskStore();

  const [isCompleted, setCompleted] = useState(is_completed);

  const handleCompleteChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCompleted(event.target.checked);

    const updatedTask: TaskProps = {
      is_completed: event.target.checked,
      id,
      title,
      description,
      label,
      due_date,
      start_time,
      end_time,
      created_at,
    };

    updateTask(updatedTask);
  };

  return (
    <div className='border p-5 rounded-xl shadow-sm bg-white dark:bg-neutral-900 dark:border-neutral-700'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-3'>
          <Checkbox checked={isCompleted} onChange={handleCompleteChange} />
          <div className={clsx(isCompleted && 'line-through')}>{title}</div>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
