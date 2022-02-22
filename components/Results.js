const Results = ({ data }) => {
  // @TODO: Make this into an accordion offering letter breakdown/number of possible words/the words
  const hasData = data.length > 0;
  return (
    <div
      className="mt-4"
      role="alert">
      <h2 className="col mt-0 mb-2">
        {hasData ? 'Results' : 'Error'}
      </h2>
      <dl>
        {
          hasData ?
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
                    i === 0 &&
                    <span>
                    &nbsp; possible words
                  </span>
                  }
                </dd>
              </div>
            )) :
            <div
              className="mt-4">
              There are no matching words! Please click the "back" button above and check the letters are correct
            </div>
        }
      </dl>
    </div>
  );
};

export default Results;