import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { useTaskStore } from './task';
import { timerMode } from '../constants/timer';
import { TaskProps } from '../types/task';
import {
  InitialTimerModeStateProps,
  InitialTimerStateProps,
} from '../types/timer';

const updatePomos = (task: TaskProps | null | undefined) => {
  if (task) {
    const newActiveTask = { ...task, pomos: task.pomos + 1 };
    useTaskStore.getState().updateTask(newActiveTask);
    return newActiveTask;
  }
  return task;
};

export const useTimerModeStore = create<InitialTimerModeStateProps>()(
  persist(
    (set) => ({
      timerMode: timerMode,
      setTimerMode: (updatedMode) => {
        set((state) => ({
          timerMode: state.timerMode.map((mode) =>
            mode.mode === updatedMode.mode
              ? { ...mode, time: updatedMode.time }
              : mode,
          ),
        }));
      },
    }),
    {
      name: 'timer-mode',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export const useTimerStore = create<InitialTimerStateProps>()(
  persist(
    (set) => ({
      cycleCount: 1,
      interval: 4,
      currentTimerMode: useTimerModeStore.getState().timerMode[0],
      isRunning: false,
      isPaused: false,
      isEnd: false,
      setActiveTask: (task) => {
        set({ activeTask: task });
      },
      setCurrentTimerMode: (updatedMode) => {
        set((state) => ({
          ...state,
          currentTimerMode: {
            ...state.currentTimerMode,
            time: updatedMode.time,
          },
        }));
      },
      setStart: () => set({ isRunning: true, isPaused: false, isEnd: false }),
      setPause: () => set({ isRunning: false, isPaused: true, isEnd: false }),
      setEnd: () =>
        set({
          currentTimerMode: useTimerModeStore.getState().timerMode[0],
          isRunning: false,
          isPaused: false,
          isEnd: true,
          cycleCount: 1,
        }),
      transitionToNextMode: () => {
        set((state) => {
          const { cycleCount, interval, activeTask } = state;
          const { mode } = state.currentTimerMode;

          const timerModeState = useTimerModeStore.getState().timerMode;

          let nextMode;
          let newCycleCount = cycleCount;
          let newuActiveTask = activeTask;

          if (mode === 'focus' && cycleCount < interval) {
            nextMode = timerModeState[1];
            newuActiveTask = updatePomos(state.activeTask);
          } else if (mode === 'shortBreak' && cycleCount < interval) {
            nextMode = timerModeState[0];
            newCycleCount = cycleCount + 1;
          } else if (mode === 'focus' && cycleCount === interval) {
            nextMode = timerModeState[2];
            newuActiveTask = updatePomos(state.activeTask);
          } else {
            nextMode = timerModeState[0];
            newCycleCount = 1;
          }

          const newState = {
            ...state,
            isPaused: false,
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
