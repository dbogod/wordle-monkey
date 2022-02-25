import { useState, useRef } from "react";

import GuessedWords from "../components/GuessedWords";
import Results from '../components/Results';
import { createBlankLetterRow, createDataObj, generateResults } from '../components/utilities/helpers';

const Home = () => {
  const [step, setStep] = useState(0);
  const [guessedWords, setGuessedWords] = useState([{ wordId: 0, letters: createBlankLetterRow(5) }]);
  const [numberOfCompleteGuessedWords, setNumberOfCompleteGuessedWords] = useState(0);
  const [error, setError] = useState({});
  const [results, setResults] = useState([]);

  const backButton = useRef(null);
  const nextButton = useRef(null);
  const resetButton = useRef(null);

  const noIncompleteWords = () => numberOfCompleteGuessedWords > 0 && numberOfCompleteGuessedWords === guessedWords.length;

  const editPosition = obj => {
    const editedState = [...guessedWords];
    editedState.forEach(word => {
      if (word.wordId === obj.wordId) {
        word.letters.forEach(letter => {
          if (letter.id === obj.letter.id) {
            letter.status = obj.letter.status;
          }
        });
      }
    });
    setGuessedWords(editedState);
  };

  const updateNumberOfCompletedGuessedWords = guessedWordList => {
    const numberOfBlanks = word => {
      return word.letters.filter(letter => letter.letter === '').length;
    };
    const rowsWithNoBlanks = guessedWordList.filter(guessedWord => numberOfBlanks(guessedWord) === 0);
    setNumberOfCompleteGuessedWords(rowsWithNoBlanks.length);
    return rowsWithNoBlanks;
  };

  const editGuessedWord = word => {
    const editedGuessedWords = [...guessedWords];
    editedGuessedWords.forEach(guessedWord => {
      if (guessedWord.wordId === word.wordId) {
        guessedWord.letters.forEach(guessedLetter => {
          if (guessedLetter.id === word.letters[0].id) {
            guessedLetter.letter = word.letters[0].letter;
          }
        });
      }
    });

    setGuessedWords(editedGuessedWords);

    const validRows = updateNumberOfCompletedGuessedWords(editedGuessedWords);

    if (editedGuessedWords.length === validRows.length) {
      setError({ ...error, rowLength: false });
    }
  };

  const addNewGuessedWord = () => {
    if (noIncompleteWords()) {
      const newRow = {
        wordId: guessedWords[guessedWords.length - 1].wordId + 1,
        letters: createBlankLetterRow(5)
      };
      setGuessedWords([...guessedWords, newRow]);
    } else {
      setError({ ...error, rowLength: true });
    }
  };

  const removeGuessedWord = id => {
    const updatedGuessedWordsList = guessedWords.filter(guessedWord => guessedWord.wordId !== id);
    setGuessedWords(updatedGuessedWordsList);
    updateNumberOfCompletedGuessedWords(updatedGuessedWordsList);
  };

  const clickHandler = async e => {
    const isNextButton = e.currentTarget === nextButton.current;

    if (isNextButton && step === 1) {
      const data = await createDataObj(guessedWords);

      if (data) {
        const results = await generateResults(data);
        setResults(results);
      }
    }

    const areWordsComplete = noIncompleteWords();

    if (areWordsComplete) {
      const stepChange = isNextButton ? 1 : -1;
      setStep(step + stepChange);
    }

    setError({ ...error, rowLength: !areWordsComplete });
  };

  const resetHandler = () => {
    setStep(0);
    setGuessedWords([{ wordId: 0, letters: createBlankLetterRow(5) }]);
    setNumberOfCompleteGuessedWords(0);
    setError({});
    setResults([]);
  };

  return (
    <>
      <section className="container mt-4">
        <div className="row">
          <div className="col">
            <p>
              Playing Wordle? Guessed one or more letters?
              <br/>
              Want an idea of which <i>other</i> letters are most likely to be in the answer?
              <br/>
              Wordle Monkey to the rescue!
              🐵
            </p>
          </div>
        </div>
      </section>
      <section className="container mt-4">
        <form onSubmit={e => e.preventDefault()}>
          <div className="row">
            <div className="col">
              {
                step === 0 &&
                <>
                  <h2 className="mt-0">
                    Step 1: Which words have you tried so far?
                  </h2>
                  <p>
                    For example, if your opening word was <i>SOUND</i>, enter it below. Add more words as necessary.
                  </p>
                  <GuessedWords
                    guessedWords={guessedWords}
                    editWord={editGuessedWord}
                    addRow={addNewGuessedWord}
                    removeRow={removeGuessedWord}
                    error={error}/>
                </>
              }
              {
                step === 1 &&
                <>

                  <h2 className="mt-0">
                    Step 2: Tap/click the letters you know are in the answer
                  </h2>
                  <p>
                    Tap each letter <b>once</b> if you know it is <i>somewhere</i> in the word,
                    or <b>twice</b> if you know it is <i>in the right position</i>.
                  </p>
                  <GuessedWords
                    guessedWords={guessedWords}
                    editPosition={editPosition}/>
                </>
              }
              <div className="d-flex mt-4">
                {
                  step > 0 &&
                  <button
                    ref={backButton}
                    type="button"
                    id="button-back"
                    className="d-inline-block mt-2 me-2 p-2 btn btn-light shadow"
                    onClick={clickHandler}>
                    Back
                  </button>
                }
                <button
                  ref={step < 2 ? nextButton : resetButton}
                  type="button"
                  className="d-inline-block mt-2 p-2 btn btn-primary shadow"
                  onClick={step < 2 ? clickHandler : resetHandler}>
                  {
                    step === 1 ?
                      'See results' :
                      step === 2 ?
                        'Start again' :
                        'Next'
                  }
                </button>
              </div>
            </div>
          </div>
        </form>
        {
          step === 2 &&
          <Results
            data={results}/>
        }
      </section>
    </>
  );
};

export default Home;
