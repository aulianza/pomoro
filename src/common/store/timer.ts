import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { TaskProps } from '../types/task';

type TimerModeProps = {
  mode: string;
  title: string;
  time: number;
};

type InitialTimerProps = {
  activeTask?: TaskProps | null;
  timerMode: TimerModeProps;
  time: number;
  isRunning: boolean;
  isPaused: boolean;
  isEnd: boolean;
  currentCycleType: string;
  cycleCount: number;
  setActiveTask: (task: TaskProps | null) => void;
  setStart: () => void;
  setPause: () => void;
  setEnd: () => void;
  transitionToNextMode: () => void;
};

const timerMode: TimerModeProps[] = [
  { mode: 'focus', title: 'Focus', time: 1500 },
  { mode: 'shortBreak', title: 'Short Break', time: 300 },
];

export const useTimerStore = create<InitialTimerProps>()(
  persist(
    (set) => ({
      cycleCount: 0,
      currentCycleType: 'focus',
      transitionToNextMode: () => {
        set((state) => {
          const currentModeIndex = timerMode.findIndex(
            (mode) => mode.mode === state.currentCycleType,
          );

          if (currentModeIndex !== -1) {
            const nextModeIndex = (currentModeIndex + 1) % timerMode.length;

            const nextMode = timerMode[nextModeIndex];
            const nextTime = nextMode.time;

            return {
              ...state,
              timerMode: nextMode,
              time: nextTime,
              isRunning: false,
              isPaused: false,
              isEnd: false,
              currentCycleType: nextMode.mode,
              cycleCount:
                nextMode.mode === 'focus'
                  ? state.cycleCount + 1
                  : state.cycleCount,
            };
          }

          return state;
        });
      },

      timerMode: timerMode[0],
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
          timerMode: timerMode[0],
          time: timerMode[0].time,
          isRunning: false,
          isPaused: false,
          isEnd: true,
          cycleCount: 0,
          currentCycleType: 'focus',
        }),
    }),
    {
      name: 'timer-store',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
