import clsx from 'clsx';
import { useState } from 'react';

interface ToggleProps {
  isChecked: boolean;
  onChecked: (isChecked: boolean) => void;
}

const Toggle = ({ isChecked = false, onChecked }: ToggleProps) => {
  const [checked, setChecked] = useState(isChecked);

  const toggleHandler = () => {
    setChecked((prevState) => !prevState);
    onChecked(!checked);
  };

  return (
    <div className='flex items-center cursor-pointer ' onClick={toggleHandler}>
      <div
        className={clsx(
          'relative w-10 h-6 bg-gray-300 rounded-full',
          'transition-all duration-300',
          checked && 'bg-green-600',
        )}
      >
        <div
          className={clsx(
            'absolute w-6 h-6 bg-white rounded-full top-0 left-0 transform',
            'transition-all duration-300',
            checked && 'translate-x-4',
          )}
        />
      </div>
    </div>
  );
};

export default Toggle;
