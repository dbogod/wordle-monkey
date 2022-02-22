import { useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';

const AccordionSection = ({ id, title, visibleSection, clickHandler, children }) => {
  const isVisible = visibleSection === id;
  return (
    <div className="accordion-section border-bottom border-white">
      <h3 className="m-0">
        <button
          type="button"
          className="w-100 my-1 border-0 px-0 py-2 d-flex align-items-center bg-transparent"
          aria-controls={id}
          aria-expanded={isVisible}
          onClick={() => clickHandler(id)}>
          <FiChevronDown/>
          {title}
        </button>
      </h3>
      <div
        id={id}
        className={`mb-3 px-1 ${isVisible ? '' : 'd-none'}`}>
        {children}
      </div>
    </div>
  );
};

const Results = ({ data }) => {
  const [visibleSection, setVisibleSection] = useState('');
  const { filteredAnswers, letterScores } = data;
  const hasData = letterScores?.length > 0;
  const wordCount = filteredAnswers.length;

  const clickHandler = section => {
    setVisibleSection(visibleSection === section ? '' : section);
  };

  return (
    <div
      className="mt-4"
      role="alert">
      <h2 className="col mt-0 mb-2">
        {hasData ? 'Results' : 'Error'}
      </h2>

      {
        hasData &&
        <div>
          <AccordionSection
            id="letter-scores"
            title="Letters"
            visibleSection={visibleSection}
            clickHandler={clickHandler}>
            <dl>
              {
                letterScores.map((item, i) => (
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
                ))
              }
            </dl>
          </AccordionSection>
          <AccordionSection
            id="words"
            title="Possible words"
            visibleSection={visibleSection}
            clickHandler={clickHandler}>
            <ul className="list-unstyled">
              {
                filteredAnswers?.map((word, i) => (
                  <li key={i}>
                    {word}
                  </li>
                ))
              }
            </ul>
          </AccordionSection>
          <AccordionSection
            id="word-count"
            title="Number of possible words"
            visibleSection={visibleSection}
            clickHandler={clickHandler}>
          <span>
            {
              wordCount === 1 ?
                'There is only 1 possible word'
                :
                `There are ${wordCount} possible words`
            }
          </span>
          </AccordionSection>
        </div>
      }
      {
        !hasData &&
        <div
          className="mt-4">
          There are no matching words! Please click the &lsquo;back&lsquo; button above and check the letters are correct
        </div>
      }
    </div>
  );
};

export default Results;