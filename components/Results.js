const Results = ({ type, data }) => {
  return (
    <div
      className="mt-4"
      role="alert">
      <h2 className="col mt-0 mb-2">
        Results
      </h2>
      <dl>
        {
          data.map((item, i) => (
            <div
              key={i}
              className="row">
              <dt className="col-1">
                {item[0]}
              </dt>
              <dd className="col-10">
                {item[1]}
                {
                  type === 'words' && i === 0 &&
                  <span>
                    &nbsp; possible words
                  </span>
                }
                {
                  type === 'probability' &&
                  <span>
                    % {i === 0 && <span>chance of being in the word</span>}
                  </span>
                }
              </dd>
            </div>
          ))
        }
      </dl>
    </div>
  )
};

export default Results;