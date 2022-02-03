import { useState } from "react";
import LetterInput from "./LetterInput";

const ConfirmedLetters = ({ updateConfirmedLetters }) => {
  const [confirmedLettersList, setConfirmedLettersList] = useState([
    { id: 1, letter: '' },
    { id: 2, letter: '' },
    { id: 3, letter: '' },
    { id: 4, letter: '' }
  ]);

  const editConfirmedLetters = input => {
    const editedConfirmedLetters = confirmedLettersList;
    editedConfirmedLetters.forEach(confLetter => {
      if (confLetter.id === input.id) {
        confLetter.letter = input.letter;
      }
    });
    setConfirmedLettersList(editedConfirmedLetters);
    const confirmedLettersArray =
      editedConfirmedLetters
        .filter(confLetter => confLetter.letter !== '')
        .map(confLetter => confLetter.letter)
    updateConfirmedLetters(confirmedLettersArray);
  };

  return (
    <>
      <h2 className="mt-0">
        Which letters do you know are in the word?
      </h2>
      <div className="row">
        <div className="col d-flex">
          {
            [...Array(4)].map((val, i) => (
              <LetterInput
                key={i}
                letterInputNumber={i + 1}
                editConfirmedLetters={editConfirmedLetters}/>
            ))
          }
          {
            [...Array(2)].map((val, i) => (
              <LetterInput
                key={i}
                hidden={true}
                letterInputNumber={i + 1}/>
            ))
          }
        </div>
      </div>
    </>
  )
}
export default ConfirmedLetters;