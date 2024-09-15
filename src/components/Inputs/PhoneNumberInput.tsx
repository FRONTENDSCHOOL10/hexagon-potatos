// zustand import
import React, { useState, useId } from 'react';
import { validatePhoneNumber } from '@/utils/validate';

interface PropTypes {
  inputName: string;
  defaultValue?: string;
  onPhoneNumberChange: (name: string) => (value: string | number) => void;
  onValidChange: (validation: boolean) => void;
}
const PhoneNumberInput = ({
  inputName,
  defaultValue,
  onPhoneNumberChange,
  onValidChange,
}: PropTypes) => {
  const [isValid, setIsValid] = useState(true);
  const [isEnteredVal, setIsEnteredVal] = useState(false);
  const [inputVal, setInputVal] = useState('');
  const inputId = useId();

  const inputStyle = (isValid: boolean) =>
    `text-sub-2 relative pl-5 pr-16 py-2 rounded-xl w-full border border-gray-200 outline-1 ${isValid || !isEnteredVal ? 'outline-mainblue' : 'outline-errored'}`;

  const validateMessage = '휴대폰 번호를 올바르게 입력해 주세요.';

  const validateInputVal = (val: string) => {
    setIsValid(validatePhoneNumber(val));
    onValidChange(validatePhoneNumber(val));
  };

  const checkInputFilled = (val: string) => {
    val.trim() !== '' ? setIsEnteredVal(true) : setIsEnteredVal(false);
  };

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputVal = e.target.value;
    setInputVal(inputVal);
    validateInputVal(inputVal);
    checkInputFilled(inputVal);
    onPhoneNumberChange(inputName)(inputVal);
  };

  const handlePressEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      (document.activeElement as HTMLElement).blur();
    }
  };

  return (
    <div
      role="group"
      aria-label="휴대폰 번호 입력 필드"
      className="flex flex-col gap-y-1"
    >
      <label className="text-button" htmlFor={inputId}>
        휴대폰 번호
      </label>
      <input
        id={inputId}
        type="tel"
        value={inputVal}
        placeholder="휴대폰 번호를 입력해 주세요."
        defaultValue={defaultValue}
        className={inputStyle(isValid)}
        name={inputName}
        onKeyDown={handlePressEnter}
        onChange={handleChangeInput}
      />

      {isEnteredVal && !isValid && (
        <p role="alert" className={`text-xs font-normal text-errored`}>
          {validateMessage}
        </p>
      )}
    </div>
  );
};

export default PhoneNumberInput;
