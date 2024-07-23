import { InputHTMLAttributes, useEffect, useState } from 'react';

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  onValueChange: (val: string) => void;
};

function SearchBox({ onValueChange, ...props }: Props) {
  const [inputValue, setInputValue] = useState(props.value || '');

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onValueChange(inputValue.toString());
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, [inputValue]);

  return (
    <label>
      {props.label && <span>{props.label}</span>}
      <input
        className='focus:outline-none focus:shadow-none bg-transparent border border-gray-700 rounded-sm px-3 py-1'
        {...props}
        type='search'
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
    </label>
  );
}

export default SearchBox;
