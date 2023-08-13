import {
  HiChevronDoubleRight as SkipIcon,
  HiPause as PauseIcon,
  HiPlay as StartIcon,
  HiStop as EndIcon,
} from 'react-icons/hi';

import { useTimerStore } from '@/common/store/timer';

type TimerActionProps = {
  onModeChange: () => void;
};

const TimerAction = ({ onModeChange }: TimerActionProps) => {
  const { isRunning, isPaused, setStart, setPause, setEnd } = useTimerStore();

  const renderActionButton = (
    text: string,
    onClick: () => void,
    icon: React.ReactNode,
    buttonStyle: string,
  ) => (
    <button
      className={`py-3 px-6 rounded-full ${buttonStyle} flex items-center gap-1 hover:shadow-sm`}
      onClick={onClick}
    >
      {icon}
      {text}
    </button>
  );

  return (
    <div className='flex flex-col items-center gap-3 my-6'>
      <div className='flex gap-2'>
        {!isRunning ? (
          <>
            {renderActionButton(
              isPaused ? 'Resume' : 'Start',
              setStart,
              <StartIcon size={22} />,
              'bg-green-500 text-white',
            )}
            {renderActionButton(
              'Skip',
              onModeChange,
              <SkipIcon size={22} />,
              'bg-sky-500 text-white',
            )}
          </>
        ) : (
          renderActionButton(
            'Pause',
            setPause,
            <PauseIcon size={22} />,
            'bg-amber-300 text-neutral-900',
          )
        )}
      </div>

      {!isRunning && isPaused && (
        <div className='flex gap-2'>
          {renderActionButton(
            'End Session',
            setEnd,
            <EndIcon size={22} />,
            'bg-red-500 text-white',
          )}
        </div>
      )}
    </div>
  );
};

export default TimerAction;
