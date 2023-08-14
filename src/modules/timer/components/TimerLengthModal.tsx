import clsx from 'clsx';

const TIMERS = [5, 10, 15, 20, 25, 30, 45, 60, 90, 120];

type TimerLengthModalProps = {
  selectedTime: number | undefined;
  onTimeChange: (time: number) => void;
};

const TimerLengthModal = ({
  selectedTime,
  onTimeChange,
}: TimerLengthModalProps) => {
  return (
    <div className='p-6 flex flex-col gap-5'>
      <div className='grid grid-cols-2 gap-4 items-center justify-between'>
        {TIMERS.map((timer, index) => (
          <button
            key={index}
            onClick={() => onTimeChange(timer)}
            className={clsx(
              'py-3 px-5 bg-neutral-200 dark:bg-neutral-700 rounded-full',
              selectedTime === timer && '!bg-neutral-100 dark:bg-neutral-500',
            )}
          >
            {timer} Minutes
          </button>
        ))}
      </div>
    </div>
  );
};

export default TimerLengthModal;
