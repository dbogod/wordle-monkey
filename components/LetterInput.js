import { useRef } from "react";

const LetterInput = ({ value, letterNumber, editLetter, editWord, rowId, hidden }) => {
  const input = useRef(null);
  const labelText = `Letter ${letterNumber.toString()}`;
  let inputId = '';
  if (letterNumber > -1) {
    inputId = `letter-input-${letterNumber.toString()}`;
  }
  if (rowId > -1) {
    inputId = `word-${rowId.toString()}-${inputId}`;
  }

  const focusNextInput = (currentInputId, nextInputNumber) => {
    const nextInputId = `${currentInputId.substring(0, inputId.length - 1)}${letterNumber + nextInputNumber}`;
    const nextInput = document.querySelector(`#${nextInputId}`);
    nextInput && nextInput.focus();
  };

  const changeHandler = e => {
    let val;
    const keyedValue = e.nativeEvent?.data;
    // Update state and move the focus to the next input along
    if (input.current && keyedValue) {
      // Allow letters only
      if (/^[^a-zA-Z]$/.test(keyedValue)) {
        return;
      }

      val = keyedValue.toLowerCase();
    } else if (input.current) {
      val = '';
    }

    // Update guessed words list
    if (editWord) {
      editWord(
        {
          wordId: rowId,
          letters: [
            {
              id: letterNumber,
              letter: val
            }
          ]
        }
      );
    } else if (editLetter) {
      editLetter({ id: letterNumber, letter: val }, 'letter');
    }

    const nextInputNumber = val === '' ? -1 : 1;
    focusNextInput(inputId, nextInputNumber);
  };

  const keyUpHandler = e => {
    if (input.current.value === '' && e.key === 'Backspace') {
      focusNextInput(inputId, -1);
    }
  };

  return (
    <div className="d-inline-flex flex-column me-1">
      {
        !hidden &&
        <label
          className="visually-hidden"
          htmlFor={inputId ?? ''}>
          {labelText}
        </label>
      }
      <input
        ref={input}
        id={inputId ?? ''}
        type="text"
        autoFocus={letterNumber === 0}
        maxLength="1"
        value={value}
        autoComplete="off"
        pattern="^[a-zA-Z]?$"
        hidden={hidden}
        className="p-0 rounded border text-center"
        onChange={changeHandler}
        onKeyUp={keyUpHandler}
      />
    </div>
  );
};

export default LetterInput;
