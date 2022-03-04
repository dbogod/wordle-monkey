import LetterInput from "./LetterInput";
import LetterClickable from "./LetterClickable";

import styles from '../styles/Buttons.module.scss';

const LettersRow = ({ letters, editLetter, editPosition, editWord, removeRow, rowId }) => {
  return (
    <>
      <div className="row mt-2">
        <div className="col d-flex">
          {
            [...letters].map(({ id, letter, status }) => {
              if (editPosition) {
                return (
                  <LetterClickable
                    key={id}
                    letterNumber={id}
                    rowId={rowId}
                    value={letter}
                    status={status}
                    editPosition={editPosition}
                  />
                );
              } else {
                return (
                  <LetterInput
                    key={id}
                    letterNumber={id}
                    rowId={rowId}
                    value={letter}
                    editLetter={editLetter}
                    editWord={editWord}
                  />
                );
              }
            })
          }
          {
            rowId > 0 && removeRow &&
            <button
              type="button"
              className={`${styles.buttonRemoveWord} btn btn-remove-word shadow align-self-center w-100 d-flex align-items-center justify-content-center`}
              aria-label="Remove this word row"
              title="Remove this word row"
              onClick={() => removeRow(rowId)}>
              x
            </button>
          }
        </div>
      </div>
    </>
  );
};
export default LettersRow;