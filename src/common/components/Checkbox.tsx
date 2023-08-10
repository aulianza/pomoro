import { InputHTMLAttributes } from 'react';

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  checked: boolean;
}

const Checkbox = ({ label, checked, ...rest }: CheckboxProps) => {
  return (
    <div className='flex items-center'>
      <input
        type='checkbox'
        className='form-checkbox h-5 w-5 text-indigo-600 cursor-pointer'
        checked={checked}
        {...rest}
      />
      {label && <label className='ml-2'>{label}</label>}
    </div>
  );
};

export default Checkbox;
