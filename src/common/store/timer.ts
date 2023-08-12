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
  // { mode: 'longBreak', title: 'Long Break', time: 900 },
];

// const timerMode: TimerModeProps[] = [
//   { mode: 'focus', title: 'Focus', time: 10 },
//   { mode: 'shortBreak', title: 'Short Break', time: 5 },
// ];

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

      timerMode:
        localStorage.getItem('timerMode') !== null
          ? JSON.parse(localStorage.getItem('timerMode')!)
          : timerMode[0],
      time:
        localStorage.getItem('timerTime') !== null
          ? parseInt(localStorage.getItem('timerTime')!)
          : timerMode[0].time,
      isRunning: false,
      isPaused: false,

      setActiveTask: (task) => {
        set({ activeTask: task });
      },
      setStart: () => set({ isRunning: true, isPaused: false }),
      setPause: () => set({ isRunning: false, isPaused: true }),
      setEnd: () =>
        set({
          timerMode: timerMode[0],
          time: timerMode[0].time,
          isRunning: false,
          isPaused: false,
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
