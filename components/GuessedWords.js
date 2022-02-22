import LettersRow from "./LettersRow";

const GuessedWords = ({ guessedWords, editWord, addRow, removeRow, editPosition, error }) => {
  return (
    <>
      {
        error?.rowLength &&
        <div className="row">
          <div className="col">
            <div
              className="d-inline-block mb-2 p-2 bg-white text-danger"
              role="alert">
              <h3 className="mb-0">
                Error
              </h3>
              Please check all your words so far have 5 letters
            </div>
          </div>
        </div>
      }
      {
        guessedWords.map(({ wordId, letters }) => (
          <LettersRow
            key={wordId}
            letters={letters}
            rowId={wordId}
            editWord={editWord}
            removeRow={removeRow}
            editPosition={editPosition}
          />
        ))
      }
      {
        !editPosition &&
        <div className="row">
          <div className="col">
            <button
              type="button"
              id="add-word"
              className="d-block mt-2 p-2 btn btn-add-word shadow"
              onClick={addRow}>
              Add another word
            </button>
          </div>
        </div>
      }
    </>
  );
};

export default GuessedWords;