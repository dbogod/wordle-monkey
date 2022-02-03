import { useState, useEffect } from "react";
import Head from "next/head";

import ConfirmedLetters from '../components/ConfirmedLetters';
import GuessedWordsList from "../components/GuessedWordsList";
import Results from '../components/Results';

const Home = () => {
  const [confirmedLetters, updateConfirmedLetters] = useState([]);
  const [guessedLetters, setGuessedLetters] = useState([]);
  const tabClass = 'is-tab';
  const submitHandler = e => {
    e.preventDefault();
    console.log('form submitted');
  }

  useEffect(() => {
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
    <>
      <Head>
        <title>
          Wordle Monkey
        </title>
        <meta name="viewport" content="width=device-width,initial-scale=1"/>
      </Head>
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
          </form>
          <Results />
        </section>
      </main>
    </>
  )
}

export default Home;
