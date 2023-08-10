'use client';

import clsx from 'clsx';
import { useState } from 'react';
import { MdMoreVert as MoreIcon } from 'react-icons/md';

import BottomSheet from '@/common/components/BottomSheet';
import Checkbox from '@/common/components/Checkbox';
import { useTaskStore } from '@/common/store/task';
import { TaskProps } from '@/common/types/task';

import AddEditTask from './AddEditTask';

const TaskItem = ({
  id,
  title,
  notes,
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
    setCompleted(event.target.checked);

    const updatedTask: TaskProps = {
      is_completed: event.target.checked,
      id,
      title,
      notes,
      label,
      due_date,
      start_time,
      end_time,
      created_at,
    };

    updateTask(updatedTask);
  };

  return (
    <>
      <div className='border p-5 rounded-xl shadow-sm bg-white dark:bg-neutral-900 dark:border-neutral-700'>
        <div className='flex items-center justify-between'>
          <div className='w-11/12 flex items-center gap-4'>
            <Checkbox checked={isCompleted} onChange={handleCompleteChange} />
            <div className={clsx(isCompleted && 'line-through')}>{title}</div>
          </div>
          <MoreIcon
            onClick={() => setOpen(true)}
            className='w-1/12 cursor-pointer'
            size={20}
          />
        </div>
      </div>
      <BottomSheet title='Edit Task' isOpen={isOpen} onClose={setOpen}>
        <AddEditTask
          action='edit'
          id={id}
          title={title}
          notes={notes}
          onSave={() => setOpen(false)}
        />
      </BottomSheet>
    </>
  );
};

export default TaskItem;
