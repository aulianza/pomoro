import { create } from 'zustand';

import { TaskProps } from '../types/task';

type TaskStoreProps = {
  tasks: TaskProps[];
  setTasks: (tasks: TaskProps[]) => void;
  addTask: (task: TaskProps) => void;
  updateTask: (task: TaskProps) => void;
  deleteTask: (task: TaskProps) => void;
};

export const useTaskStore = create<TaskStoreProps>((set) => {
  const storedTasks =
    typeof window !== 'undefined' ? localStorage.getItem('tasks') : null;
  // console.log("🚀 aulianza ~ useTaskStore ~ storedTasks => ", storedTasks)

  const initialTasks = storedTasks ? JSON.parse(storedTasks) : [];

  return {
    tasks: initialTasks,
    setTasks: (tasks) => {
      set({ tasks });
      localStorage.setItem('tasks', JSON.stringify(tasks));
    },
    addTask: (task) => {
      set((state) => ({ tasks: [...state.tasks, task] }));
    },
    updateTask: (task) => {
      set((state) => ({
        tasks: state.tasks.map((t) => (t.id === task.id ? task : t)),
      }));
    },
    deleteTask: (task) => {
      set((state) => ({
        tasks: state.tasks.filter((t) => t.id !== task.id),
      }));
    },
  };
});
