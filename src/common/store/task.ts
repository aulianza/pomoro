import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { TaskStoreProps } from '../types/task';

export const useTaskStore = create<TaskStoreProps>()(
  persist(
    (set) => ({
      tasks: [],
      addTask: (task) => {
        set((state) => ({ tasks: [...state.tasks, task] }));
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
