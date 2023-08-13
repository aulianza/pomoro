import { useEffect, useState } from 'react';

import LottiePlayer from '@/common/components/LottiePlayer';
import { useTimerStore } from '@/common/store/timer';

const animations = {
  focus:
    'https://lottie.host/9e24455a-3579-47d3-9e86-816a3935bcf8/GPOFCIoVME.json',
  shortBreak:
    'https://lottie.host/5166e0ff-7264-45f4-bde4-b08a9e08f042/DVN3CF6OvA.json',
};

const TimerAnimation = () => {
  const { currentCycleType, isRunning, isPaused, isEnd } = useTimerStore();

  const [animationStatus, setAnimationStatus] = useState<
    'stop' | 'play' | 'pause'
  >('stop');
  const [animationUrl, setAnimationUrl] = useState('');

  useEffect(() => {
    if (isRunning) setAnimationStatus('play');
    else if (isPaused) setAnimationStatus('pause');
    else if (isEnd) setAnimationStatus('stop');
  }, [isRunning, isPaused, isEnd]);

  useEffect(() => {
    setAnimationUrl(
      animations[currentCycleType as keyof typeof animations] ||
        animations.focus,
    );
  }, [currentCycleType]);

  return (
    <LottiePlayer
      status={animationStatus}
      autoplay={false}
      src={animationUrl}
      width='200px'
      height='200px'
    />
  );
};

export default TimerAnimation;
