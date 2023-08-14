interface TimerCountdownProps {
  time: number;
}

const TimerCountdown = ({ time }: TimerCountdownProps) => {
  const totalMilliseconds = time * 60 * 1000;
  const hours = Math.floor(totalMilliseconds / (60 * 60 * 1000));
  const minutes = Math.floor(
    (totalMilliseconds % (60 * 60 * 1000)) / (60 * 1000),
  );
  const seconds = Math.floor((totalMilliseconds % (60 * 1000)) / 1000);

  let formattedTime = '';

  if (hours > 0) {
    formattedTime = `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  } else {
    formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}`;
  }

  return (
    <div className='text-6xl font-bold text-neutral-900'>{formattedTime}</div>
  );
};

export default TimerCountdown;
