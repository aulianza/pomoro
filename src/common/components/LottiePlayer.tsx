import { Player } from '@lottiefiles/react-lottie-player';
import { useEffect, useRef } from 'react';

type LottiePlayerProps = {
  src: string;
  width?: string;
  height?: string;
  status?: 'play' | 'pause' | 'stop';
  autoplay?: boolean;
  loop?: boolean;
};

const LottiePlayer = ({
  src,
  width = '200px',
  height = '200px',
  autoplay = true,
  loop = true,
  status,
}: LottiePlayerProps) => {
  const playerRef = useRef<Player>(null);

  useEffect(() => {
    if (!playerRef.current) return;

    switch (status) {
      case 'play':
        playerRef.current.play();
        break;
      case 'pause':
        playerRef.current.pause();
        break;
      case 'stop':
        playerRef.current.stop();
        break;
      default:
        break;
    }
  }, [status]);

  return (
    <Player
      ref={playerRef}
      autoplay={autoplay}
      loop={loop}
      src={src}
      style={{ height, width }}
    />
  );
};

export default LottiePlayer;
