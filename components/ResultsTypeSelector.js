const ResultsTypeSelector = ({ resultsType, setResultsType }) => {
  const changeHandler = e => {
    setResultsType(e.currentTarget.value);
  };

  const radioButtons = [
    { label: 'Probabilities', id: 'probability' },
    { label: 'Number of words', id: 'words' }
  ];

  return (
    <fieldset className="mt-5">
      <legend className="mb-0">
        <h2 className="mt-0">
          What would you like to see?
          <br/>
          <i>(select one)</i>
        </h2>
      </legend>

      {
        radioButtons.map(({ label, id }, i) => (
          <div
            key={i}
            className="d-flex align-items-center justify-content-between">
            <label htmlFor={id}>
              {label}
            </label>
            <input
              id={id}
              type="radio"
              name="resultsType"
              value={id}
              checked={resultsType === id}
              onChange={changeHandler}/>
          </div>
        ))
      }
    </fieldset>
  )
}
export default ResultsTypeSelector;