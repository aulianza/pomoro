import { TaskProps } from './task';

export type TimerModeProps = {
  mode: string;
  title: string;
  time: number;
};

export type InitialTimerModeStateProps = {
  timerMode: TimerModeProps[];
  setTimerMode: (mode: TimerModeProps) => void;
};

export type InitialTimerStateProps = {
  activeTask?: TaskProps | null;
  currentTimerMode: TimerModeProps;
  isRunning: boolean;
  isPaused: boolean;
  isEnd: boolean;
  interval: number;
  cycleCount: number;
  setActiveTask: (task: TaskProps | null) => void;
  setStart: () => void;
  setPause: () => void;
  setEnd: () => void;
  transitionToNextMode: () => void;
  setCurrentTimerMode: (updatedMode: TimerModeProps) => void;
};
