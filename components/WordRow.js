import LetterInput from "./LetterInput";

const WordRow = ({ id, removeWordRow, editWordRow }) => {
  const wordRowId = `word-${id}`;
  const editWord = string => {
    editWordRow({id, word: string});
  };

  return (
    <>
      <div
        id={wordRowId}
        className={`row mt-${id === 1 ? '0' : '2'}`}>
        <div className="col d-flex">
          {
            [...Array(5)].map((val, i) => (
              <LetterInput
                key={i}
                letterInputNumber={i + 1}
                wordRowId={wordRowId}
                editWord={editWord}/>
            ))
          }
          <div className="letter-input-wrapper d-inline-flex align-content-center">
            <button
              type="button"
              className={`${id === 1 ? 'invisible' : ''} btn btn-remove-word shadow align-self-center w-100`}
              disabled={id === 1}
              aria-label="Remove word row"
              title="Remove word row"
              onClick={() => removeWordRow(id)}>
              x
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default WordRow;