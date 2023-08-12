'use client';

import { useEffect, useState } from 'react';

import { useTaskStore } from '@/common/store/task';

import TaskItemModalSelect from './TaskItemModalSelect';

const TaskListModal = () => {
  const { tasks } = useTaskStore();

  const filteredTasks = tasks?.filter((task) => !task?.is_completed);

  const [isMounted, setMounted] = useState(false);

  const renderLoading = () => {
    return null;
  };

  useEffect(() => {
    setMounted(true);
  }, [tasks]);

  return (
    <div className='p-6'>
      <div className='flex flex-col gap-2'>
        {isMounted
          ? filteredTasks?.map((task, index) => (
              <TaskItemModalSelect key={index} {...task} />
            ))
          : renderLoading()}
      </div>
    </div>
  );
};

export default TaskListModal;
