import { useState, useId } from 'react';

interface PropTypes {
  inputName: string;
  value?: string;
  inputLabel: string;
  placeholder: string;
  step?: number;
  type: 'date' | 'file' | 'number' | 'text' | 'url';
  onInputChange: (name: string) => (value: string | number) => void;
}

const StandardInput = ({
  type,
  inputName,
  value,
  onInputChange,
  inputLabel,
  placeholder,
  step,
}: PropTypes) => {
  const [inputVal, setInputVal] = useState<string | number>(value || '');

  const today = new Date();
  const todayString = today.toISOString().slice(0, 10);
  const nextYear = new Date();
  nextYear.setFullYear(today.getFullYear() + 1);
  const maxDate = nextYear.toISOString().slice(0, 10);

  const inputId = useId();

  const inputStyle =
    'text-sub-2 h-[2.8125rem] relative pl-5 pr-12 py-2 rounded-xl w-full border border-gray-200 outline-1 outline-mainblue';

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputVal = e.target.value;
    setInputVal(inputVal);
    onInputChange(inputName)(inputVal);
  };

  const handlePressEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      (document.activeElement as HTMLElement).blur();
    }
  };

  const renderInput = () => {
    switch (type) {
      case 'text':
        return (
          <input
            id={inputId}
            type="text"
            value={inputVal}
            placeholder={placeholder}
            className={inputStyle}
            name={inputName}
            onKeyDown={handlePressEnter}
            onChange={handleChangeInput}
          />
        );
      case 'date':
        return (
          <input
            id={inputId}
            type="date"
            value={inputVal}
            className={inputStyle}
            name={inputName}
            onKeyDown={handlePressEnter}
            onChange={handleChangeInput}
            min={todayString}
            max={maxDate}
          />
        );
      case 'number':
        return (
          <input
            id={inputId}
            type="number"
            value={inputVal}
            placeholder={placeholder}
            className={inputStyle}
            name={inputName}
            onKeyDown={handlePressEnter}
            onChange={handleChangeInput}
            min={1}
            step={step}
          />
        );
      case 'file':
        return (
          <input
            id={inputId}
            type="file"
            value={inputVal}
            placeholder={placeholder}
            className={inputStyle}
            name={inputName}
            onKeyDown={handlePressEnter}
            onChange={handleChangeInput}
          />
        );
      case 'url':
        return (
          <input
            id={inputId}
            type="url"
            value={inputVal}
            placeholder="https://example.com"
            className={inputStyle}
            name={inputName}
            onKeyDown={handlePressEnter}
            onChange={handleChangeInput}
            pattern="https://.*"
          />
        );
    }
  };

  return (
    <div
      role="group"
      aria-label={`${inputLabel} 입력 필드`}
      className="flex flex-col gap-y-1"
    >
      <label className="text-button" htmlFor={inputId}>
        {inputLabel}
      </label>
      {renderInput()}
    </div>
  );
};

export default StandardInput;
