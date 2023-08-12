'use client';

import { useEffect, useMemo, useState } from 'react';

import { useTaskStore } from '@/common/store/task';

import TaskItemModalSelect from './TaskItemModalSelect';

type TaskListModalProps = {
  onClose: () => void;
};

const TaskListModal = ({ onClose }: TaskListModalProps) => {
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
    <div className='p-6'>
      <div className='flex flex-col gap-2'>
        {isMounted
          ? sortedTasks?.map((task, index) => (
              <TaskItemModalSelect key={index} {...task} onSelect={onClose} />
            ))
          : renderLoading()}
      </div>
    </div>
  );
};

export default TaskListModal;
