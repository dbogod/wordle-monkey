import { useState, useRef } from "react";

const LetterInput = ({ letterInputNumber, wordRowId, editWord, editConfirmedLetters, hidden }) => {
  const input = useRef(null);
  const [value, updateValue] = useState('');
  const labelText = `Letter ${(parseInt(letterInputNumber)).toString()}`;
  let inputId = `letter-input-${letterInputNumber}`;
  if (wordRowId) {
    inputId = `${wordRowId}-${inputId}`;
  }

  const focusNextInput = (currentInputId, nextInputNumber) => {
    const nextInputId = `${currentInputId.substring(0, inputId.length - 1)}${letterInputNumber + nextInputNumber}`;
    const nextInput = document.querySelector(`#${nextInputId}`);
    nextInput && nextInput.focus();
  };

  const changeHandler = e => {
    if (input.current) {
      // Allow letters only
      const { data } = e.nativeEvent;
      if (/^[^a-zA-Z]$/.test(data)) {
        input.current.value = value;
        return;
      }

      // Update state and move the focus to the next input along
      const val = input.current.value.toLowerCase();
      updateValue(val);
      const nextInputNumber = val === '' ? -1 : 1;
      focusNextInput(inputId, nextInputNumber);

      // Update guessed words list
      if (wordRowId) {
        const wordRow = input.current.closest(`#${wordRowId}`);
        const inputs = wordRow?.querySelectorAll('input');
        const string = [...inputs].map(input => input.value).filter(value => value !== '').join('');
        editWord(string);
      } else if (editConfirmedLetters) {
        editConfirmedLetters({ id: letterInputNumber, letter: val });
      }
    }
  };

  const keyUpHandler = e => {
    if (input.current.value === '' && e.key === 'Backspace') {
      focusNextInput(inputId, -1);
    }
  };

  return (
    <div className="d-inline-flex flex-column letter-wrapper">
      <label
        className="visually-hidden"
        htmlFor={inputId}>
        {labelText}
      </label>
      <input
        ref={input}
        id={inputId}
        type="text"
        maxLength="1"
        value={value}
        autoComplete="off"
        pattern="^[a-zA-Z]?$"
        hidden={hidden}
        className={`rounded border text-center`}
        onChange={changeHandler}
        onKeyUp={keyUpHandler}/>
    </div>
  )
};

export default LetterInput;
