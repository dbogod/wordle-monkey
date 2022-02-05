import { useState, useRef, useEffect } from "react";
import WordRow from "./WordRow";

const GuessedWordsList = ({ setGuessedLetters }) => {
  const errorAlert = useRef(null);
  const [wordRows, updateWordRows] = useState([{ id: 1, word: '' }]);
  const [error, setError] = useState({ type: '', msg: '' });

  const updateGuessedLetters = wordRowsArr => {
    let guessedLetters = [];
    const completeWordRows = wordRowsArr.filter(wordRow => wordRow.word.length === 5);

    if (completeWordRows.length > 0) {
      const lettersArr = [];
      [...completeWordRows].forEach(wordRow => {
        [...wordRow.word.split('')].forEach(letter => lettersArr.push(letter));
      });
      // Remove duplicates
      guessedLetters = [...new Set(lettersArr)];
    }

    setGuessedLetters(guessedLetters);
  };

  const removeWordRow = id => {
    const editedWordRowsArr = wordRows.filter(wordRow => wordRow.id !== id);
    updateWordRows(editedWordRowsArr);
    updateGuessedLetters(editedWordRowsArr);
  };

  const addWordRow = () => {
    // If all words so far have 5 letters
    const inCompleteWords = wordRows.filter(wordRow => wordRow.word.length !== 5);

    if (inCompleteWords.length === 0) {
      setError({ type: '', msg: '' });
      const id = Math.floor(Math.random() * 100000);
      updateWordRows([...wordRows, { id, word: '' }]);
    } else {
      setError({
        type: 'incomplete',
        msg: 'Incomplete word(s): Please check all your words so far have 5 letters'
      });
    }
  };

  const editWordRow = wordRow => {
    wordRows.forEach(row => {
      if (row.id === wordRow.id) {
        row.word = wordRow.word;
      }
    })
    updateWordRows(wordRows);
    updateGuessedLetters(wordRows);
  };

  useEffect(() => {
    if (error.type !== '' && errorAlert.current) {
      errorAlert.current.scrollIntoView();
    }
  }, [error]);

  return (
    <>
      <div className="row mt-5">
        <div className="col">
          <h2 className="mt-0">
            Which words have you tried already?
            <br/>
            <i>(optional)</i>
          </h2>
        </div>
      </div>
      {
        error.type !== '' &&
        <div className="row">
          <div className="col">
            <div
              ref={errorAlert}
              className="d-inline-block mb-2 p-2 bg-white text-danger"
              role="alert">
              <h3 className="mb-0">
                Error
              </h3>
              {error.msg}
            </div>
          </div>
        </div>
      }
      {
        wordRows.map(({ id }) => (
          <WordRow
            key={id}
            id={id}
            removeWordRow={removeWordRow}
            editWordRow={editWordRow}/>
        ))
      }
      <div className="row">
        <div className="col">
          <button
            type="button"
            id="add-word"
            className="d-block mt-2 p-2 btn btn-add-word shadow"
            onClick={addWordRow}>
            Add another word
          </button>
        </div>
      </div>
    </>
  )
}

export default GuessedWordsList;