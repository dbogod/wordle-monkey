import LetterInput from "./LetterInput";

const ConfirmedLetters = ({ updateConfirmedLetters }) => {
  return (
    <>
      <h2>
        Which letters do you know are in the word?
      </h2>
      <div className="row">
        <div className="col d-flex justify-content-between">
          {
            [...Array(4)].map((val, i) => (
              <LetterInput
                key={i}
                letterInputNumber={i + 1}/>
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