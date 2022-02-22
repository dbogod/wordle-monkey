import LetterInput from "./LetterInput";
import LetterClickable from "./LetterClickable";

const LettersRow = ({ letters, editLetter, editPosition, editWord, removeRow, rowId }) => {
  return (
    <>
      <div className="row">
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
            <div className="letter-input-wrapper d-inline-flex align-content-center">
              <button
                type="button"
                className="btn btn-remove-word shadow align-self-center w-100"
                aria-label="Remove word row"
                title="Remove word row"
                onClick={() => removeRow(rowId)}>
                x
              </button>
            </div>
          }
        </div>
      </div>
    </>
  );
};
export default LettersRow;