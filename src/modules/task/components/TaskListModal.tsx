'use client';

import { useEffect, useMemo, useState } from 'react';

import { useTaskStore } from '@/common/store/task';

import TaskItemModalSelect from './TaskItemModalSelect';

type TaskListModalProps = {
  onClose: () => void;
  onCreateNewTask: () => void;
};

const TaskListModal = ({ onClose, onCreateNewTask }: TaskListModalProps) => {
  const { tasks } = useTaskStore();

  const [isMounted, setMounted] = useState(false);

  const renderLoading = () => {
    return null;
  };

  useEffect(() => {
    setMounted(true);
  }, [tasks]);

  const sortedTasks = useMemo(() => {
    return isMounted
      ? tasks
          .filter((task) => !task?.is_completed)
          .slice()
          .sort((a, b) => b.created_at.localeCompare(a.created_at))
      : [];
  }, [isMounted, tasks]);

  return (
    <>
      <div className='p-6 flex flex-col gap-5'>
        <div className='flex flex-col gap-2'>
          {isMounted
            ? sortedTasks?.map((task, index) => (
                <TaskItemModalSelect key={index} {...task} onSelect={onClose} />
              ))
            : renderLoading()}
        </div>
        <div>
          <button
            type='submit'
            className='py-3 px-4 bg-sky-500 rounded-full w-full text-white'
            onClick={onCreateNewTask}
          >
            Create New Task
          </button>
        </div>
      </div>
    </>
  );
};

export default TaskListModal;
