import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { TaskProps } from '../types/task';

type TaskStoreProps = {
  tasks: TaskProps[];
  addTask: (task: TaskProps) => void;
  updateTask: (task: TaskProps) => void;
  deleteTask: (taskId: string) => void;
};

export const useTaskStore = create<TaskStoreProps>()(
  persist(
    (set) => ({
      tasks: [],
      addTask: (task) => {
        set((state) => ({ tasks: [task, ...state.tasks] }));
      },
      updateTask: (task) => {
        set((state) => ({
          tasks: state.tasks.map((t) => (t.id === task.id ? task : t)),
        }));
      },
      deleteTask: (taskId) => {
        set((state) => ({
          tasks: state.tasks.filter((t) => t.id !== taskId),
        }));
      },
    }),
    {
      name: 'task-data',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
