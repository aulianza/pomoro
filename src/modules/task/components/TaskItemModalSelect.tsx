import clsx from 'clsx';

import { useTimerStore } from '@/common/store/timer';
import { TaskProps } from '@/common/types/task';

const TaskItemModalSelect = (props: TaskProps) => {
  const { activeTask, setActiveTask, setEnd } = useTimerStore();

  const handleSelectTask = () => {
    setActiveTask(props);
    setEnd();

    if (props?.id === activeTask?.id) {
      setActiveTask(null);
    }
  };

  return (
    <div
      className={clsx(
        'border py-4 px-5 rounded-xl shadow-sm bg-white dark:bg-neutral-900 dark:border-neutral-700 cursor-pointer',
        activeTask?.id === props?.id && '!bg-neutral-100 dark:!bg-neutral-700',
      )}
      onClick={() => {
        handleSelectTask();
      }}
    >
      <div className='text-[15px] text-neutral-800 dark:text-neutral-200'>
        {props?.title}
      </div>
    </div>
  );
};

export default TaskItemModalSelect;
