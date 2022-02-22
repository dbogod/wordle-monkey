const LetterClickable = ({ value, status, letterNumber, rowId, editPosition }) => {
  const changeHandler = e => {
    editPosition({ wordId: rowId, letter: { id: letterNumber, status: e.target.value } });
  };

  const clickHandler = e => {
    let newStatus;
    switch (status) {
      case 'absent':
        newStatus = 'present';
        break;
      case 'present':
        newStatus = 'correct';
        break;
      case 'correct':
        newStatus = 'absent';
        break;
    }
    editPosition({ wordId: rowId, letter: { id: letterNumber, status: newStatus } });
  };

  const inputValues = ['absent', 'present', 'correct'];

  return (
    <div className="d-inline-flex flex-column me-1">
      <button
        className={`letter-clickable letter-clickable--${status} d-flex align-items-center justify-content-center p-0 rounded border text-center`}
        onClick={clickHandler}>
        {value}
      </button>
      <fieldset>
        {
          inputValues.map((val, i) => (
            <div
              key={i}
              className="visually-hidden">
              <input
                id={`word-${rowId}-position-${letterNumber}-${val}`}
                tabIndex="-1"
                name={`position-${letterNumber}`}
                value={val}
                checked={status === val}
                onChange={changeHandler}
                type="radio"/>
              <label htmlFor={`word-${rowId}-position-${letterNumber}-${val}`}>
                {
                  val === 'absent' ?
                    'Letter is not in the answer' :
                    val === 'present' ?
                      'Letter is somewhere in the answer' :
                      `Letter is definitely in position ${letterNumber} in the answer`
                }
              </label>
            </div>
          ))
        }
      </fieldset>
    </div>
  );
};

export default LetterClickable;