import { useState, useEffect } from "react";


import ConfirmedLetters from '../components/ConfirmedLetters';
import GuessedWordsList from "../components/GuessedWordsList";
import ResultsTypeSelector from '../components/ResultsTypeSelector';
import ErrorMessage from '../components/ErrorMessage';
import Results from '../components/Results';

import {
  sortArray,
  addKeyOrIncrementValue,
  convertToPercentage
} from '../components/utilities/helpers';
import { POSSIBLE_ANSWERS } from "../components/utilities/possibleAnswers";

const Home = () => {
  const [confirmedLetters, updateConfirmedLetters] = useState([]);
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [resultsType, setResultsType] = useState('');
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');

  const getDataObj = async () => {
    const hasConfirmedLetters = confirmedLetters.length > 0;
    const hasResultsType = resultsType !== '';
    if (hasConfirmedLetters && hasResultsType) {
      const letters = {};
      confirmedLetters.forEach((letter) => {
        letters[letter] = (letters[letter] || 0) + 1;
      });

      const dataObj = {
        letters,
        resultsType
      };

      if (guessedLetters.length > 0) {
        dataObj.excLetters = guessedLetters.filter((letter) => !confirmedLetters.includes(letter));
      }

      return dataObj;
    } else {
      let error = '';
      switch (true) {
        case !hasConfirmedLetters && !resultsType:
          error =
            "Error! Check that you have entered some confirmed letters (a-z only) and select what results you like to see.";
          break;
        case !hasConfirmedLetters:
          error =
            "Error! Check that you have only entered letters a-z and try again";
          break;
        case !resultsType:
          error = "Error! Select what type of results you would like to see.";
          break;
      }
      setError(error);
      return false;
    }
  };

  const generateResults = async (dataObj, wordsArr = POSSIBLE_ANSWERS) => {
    let results = {};
    let containsDuplicates = false;
    // Filter words list based on supplied letters
    const incLettersObj = dataObj.letters;
    const excLettersArr = dataObj.excLetters;
    const type = dataObj.resultsType;
    const letters = Object.keys(incLettersObj);
    letters.forEach((letter) => {
      // If duplicate letter, update boolean
      incLettersObj[letter] > 1 && (containsDuplicates = true);
    });

    let incRegexString = '';
    if (!containsDuplicates) {
      letters.forEach((letter) => {
        incRegexString = `${incRegexString}(?=.*${letter})`;
      });
    }
    incRegexString = `${incRegexString}.*`;

    let excRegexString = "";
    if (excLettersArr.length) {
      excRegexString = "^[^";
      excLettersArr.forEach((letter) => {
        excRegexString = `${excRegexString}${letter}`;
      });
      excRegexString = `${excRegexString}]+$`;
    }

    const wordsContainingSubmittedLetters = wordsArr.filter((word) => {
      let containsAllLetters;
      if (containsDuplicates) {
        containsAllLetters = true;
        for (let i = 0; i <= letters.length - 1; i++) {
          const regex = new RegExp(`[^${letters[i]}]`, "g");
          if (word.replace(regex, "").length !== incLettersObj[letters[i]]) {
            containsAllLetters = false;
            break;
          }
        }
      } else {
        const regex = new RegExp(incRegexString, "gi");
        containsAllLetters = regex.test(word);
      }

      if (excRegexString !== "") {
        const excRegex = new RegExp(excRegexString, "gi");
        return containsAllLetters && excRegex.test(word);
      } else {
        return containsAllLetters;
      }
    });

    const cleanResults = (type) => {
      // Remove initial instances of letters from results
      letters.forEach((letter) => {
        let amountToTakeOff =
          wordsContainingSubmittedLetters.length * incLettersObj[letter];

        if (type && type === "words") {
          // Take one off for every word that only has the right count of said letter in it
          const letterCount = incLettersObj[letter];
          const regex = new RegExp(`[^${letter}]`, "g");
          const wordsContainingRightAmountOfSaidLetter = wordsContainingSubmittedLetters.filter(
            (word) => {
              return word.replace(regex, "").length === letterCount;
            }
          );
          amountToTakeOff = wordsContainingRightAmountOfSaidLetter.length;
        }

        results[letter] = results[letter] - amountToTakeOff;
      });

      // Remove zero values
      Object.keys(results).forEach((result) => {
        results[result] < 1 && delete results[result];
      });
    };

    if (wordsContainingSubmittedLetters.length === 0) {
      setError('There are no words that match these letters');
      return;
    }

    if (type === 'probability') {
      // Increment character value in friends obj
      wordsContainingSubmittedLetters.forEach((word) => {
        word.split("").forEach((char) => {
          addKeyOrIncrementValue(results, char);
        });
      });

      cleanResults();

      // Convert values to percentages
      Object.keys(results).forEach((key) => {
        results[key] = convertToPercentage(
          results[key],
          wordsContainingSubmittedLetters.length
        );
      });
    } else if (type === 'words') {
      // Loop through letters of the alphabet
      for (let i = 10; i < 36; i++) {
        const char = i.toString(36);
        const wordsContainingChar = wordsContainingSubmittedLetters.filter(
          (word) => {
            return word.includes(char);
          }
        );
        results[char] = wordsContainingChar.length;
      }

      cleanResults(type);
    }

    return sortArray(results);
  };


  const submitHandler = async (e) => {
    e.preventDefault();
    const data = await getDataObj();
    if (data) {
      const results = await generateResults(data);
      setResults(results);
    }
  };

  useEffect(() => {
    const tabClass = 'is-tab';
    const removeFocusClass = () => {
      document.body.classList.contains(tabClass) && document.body.classList.remove(tabClass);
      window.removeEventListener('mousedown', removeFocusClass);
    };

    window.addEventListener('keyup', e => {
      if (e.key === 'Tab') {
        e.preventDefault();
        document.body.classList.add(tabClass);
        window.addEventListener('mousedown', removeFocusClass);
      }
    });
  })
  return (
    <main>
      <section className="container mt-4">
        <div className="row">
          <div className="col">
            <h1>
              Wordle Monkey
            </h1>
            <p>
              Playing Wordle? Guessed one or more letters?
              <br/>
              What other letters most likely to be in the word?
              <br/>
              Use this tool to find out!
            </p>
            <p>
              <i>NB: Letter position is not taken into account... yet!</i>
            </p>
          </div>
        </div>
      </section>
      <section className="container mt-4">

        <form onSubmit={submitHandler}>
          <ConfirmedLetters
            updateConfirmedLetters={updateConfirmedLetters}/>
          <GuessedWordsList
            setGuessedLetters={setGuessedLetters}/>
          <ResultsTypeSelector
            resultsType={resultsType}
            setResultsType={setResultsType}/>
          <div className="d-flex mt-8">
            <button
              type="submit"
              className="d-inline-block mt-2 p-2 btn btn-primary shadow">
              Go
            </button>
            <button
              type="button"
              className="d-inline-block mt-2 ms-2 p-2 btn btn-light shadow">
              Reset
            </button>
          </div>
        </form>
        {
          error !== '' &&
          <ErrorMessage
            error={error}/>
        }
        {
          results.length > 0 &&
          <Results
            type={resultsType}
            data={results}/>
        }

      </section>
    </main>

  )
}

export default Home;
