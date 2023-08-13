import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { useTaskStore } from './task';
import { timerMode } from '../constants/timer';
import { TaskProps } from '../types/task';
import { InitialTimerStateProps } from '../types/timer';

const updatePomos = (task: TaskProps | null | undefined) => {
  if (task) {
    const newActiveTask = { ...task, pomos: task.pomos + 1 };
    useTaskStore.getState().updateTask(newActiveTask);
    return newActiveTask;
  }
  return task;
};

export const useTimerStore = create<InitialTimerStateProps>()(
  persist(
    (set) => ({
      cycleCount: 1,
      interval: 4,
      currentTimerMode: timerMode[0],
      time: timerMode[0].time,
      isRunning: false,
      isPaused: false,
      isEnd: false,

      setActiveTask: (task) => {
        set({ activeTask: task });
      },
      setStart: () => set({ isRunning: true, isPaused: false, isEnd: false }),
      setPause: () => set({ isRunning: false, isPaused: true, isEnd: false }),
      setEnd: () =>
        set({
          currentTimerMode: timerMode[0],
          isRunning: false,
          isPaused: false,
          isEnd: true,
          cycleCount: 1,
        }),

      transitionToNextMode: () => {
        set((state) => {
          let nextMode;
          let newCycleCount = state.cycleCount;
          let newuActiveTask = state.activeTask;

          if (
            state.currentTimerMode.mode === 'focus' &&
            state.cycleCount < state.interval
          ) {
            nextMode = timerMode[1];
            newuActiveTask = updatePomos(state.activeTask);
          } else if (
            state.currentTimerMode.mode === 'shortBreak' &&
            state.cycleCount < state.interval
          ) {
            nextMode = timerMode[0];
            newCycleCount = state.cycleCount + 1;
          } else if (
            state.currentTimerMode.mode === 'focus' &&
            state.cycleCount === state.interval
          ) {
            nextMode = timerMode[2];
            newuActiveTask = updatePomos(state.activeTask);
          } else {
            nextMode = timerMode[0];
            newCycleCount = 1;
          }

          const newState = {
            ...state,
            activeTask: newuActiveTask,
            cycleCount: newCycleCount,
            currentTimerMode: nextMode,
          };

          return newState;
        });
      },
    }),
    {
      name: 'timer-store',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
