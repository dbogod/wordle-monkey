import { useState, useRef, useEffect } from 'react';
import styles from '../styles/Results.module.scss';
import AccordionSection from './AccordionSection';

const Results = ({ data }) => {
  const resultsContainer = useRef(null);
  const [visibleSection, setVisibleSection] = useState('');
  const { filteredAnswers, letterScores } = data;
  const hasData = letterScores?.length > 0;
  const wordCount = filteredAnswers.length;

  const clickHandler = section => {
    setVisibleSection(visibleSection === section ? '' : section);
  };

  useEffect(() => {
    resultsContainer.current && resultsContainer.current.scrollIntoView({ behavior: 'smooth' });
  }, [resultsContainer]);

  return (
    <div
      ref={resultsContainer}
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
                    <dt className={`${styles.letter} col-1`}>
                      {item[0]}
                    </dt>
                    <dd className={`${styles.letterScore} col-10`}>
                      {item[1]}
                      {
                        i === 0 &&
                        <span>
                    &nbsp; possible {item[1] === 1 ? 'word' : 'words'}
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
          There are no matching words! Please click the &lsquo;back&lsquo; button above and check the letters are
          correct
        </div>
      }
    </div>
  );
};

export default Results;