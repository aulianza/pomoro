import { useEffect, useState } from 'react';

import LottiePlayer from '@/common/components/LottiePlayer';
import { useTimerStore } from '@/common/store/timer';

type AnimationMode = 'focus' | 'shortBreak' | 'longBreak';
type AnimationStatus = 'stop' | 'play' | 'pause';

const animations: Record<AnimationMode, string> = {
  focus: '/animations/focus.json',
  shortBreak: '/animations/shortBreak.json',
  longBreak: '/animations/longBreak.json',
};

const TimerAnimation = () => {
  const { currentTimerMode, isRunning, isPaused, isEnd } = useTimerStore();
  const [animationStatus, setAnimationStatus] =
    useState<AnimationStatus>('stop');
  const [animation, setAnimation] = useState(animations.focus);

  useEffect(() => {
    if (isRunning) {
      setAnimationStatus('play');
    } else if (isPaused) {
      setAnimationStatus('pause');
    } else if (isEnd) {
      setAnimationStatus('stop');
    }
  }, [isRunning, isPaused, isEnd]);

  useEffect(() => {
    setAnimation(
      animations[currentTimerMode.mode as AnimationMode] || animations.focus,
    );
  }, [currentTimerMode]);

  return (
    <LottiePlayer
      status={animationStatus}
      autoplay={false}
      src={animation}
      width='150px'
      height='150px'
    />
  );
};

export default TimerAnimation;
