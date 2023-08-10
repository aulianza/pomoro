'use client';

import { useState } from 'react';
import { MdAdd as AddTaskIcon } from 'react-icons/md';

import BottomSheet from '@/common/components/BottomSheet';
import { useTaskStore } from '@/common/store/task';

import AddTask from './AddTask';
import TaskItem from './TaskItem';

const TaskList = () => {
  const { tasks } = useTaskStore();
  // console.log('🚀 aulianza ~ TaskList ~ tasks => ', tasks);

  const [isOpen, setOpen] = useState(false);

  return (
    <div className='p-6 space-y-5'>
      <div className='flex justify-between items-center'>
        <h2 className='font-medium text-lg'>Today's Task</h2>
        <button
          onClick={() => setOpen(true)}
          className='py-2 px-3 rounded-full bg-neutral-200 flex items-center gap-1 hover:shadow-sm'
        >
          <AddTaskIcon size={18} />
          <span className='text-sm'>Add New Task</span>
        </button>
      </div>
      <div className='flex flex-col gap-3'>
        {tasks?.map((task) => <TaskItem key={task?.id} {...task} />)}
      </div>

      <BottomSheet isOpen={isOpen} onClose={setOpen}>
        <AddTask onSave={() => setOpen(false)} />
      </BottomSheet>
    </div>
  );
};

export default TaskList;
