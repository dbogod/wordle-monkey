import { POSSIBLE_ANSWERS } from "./possibleAnswers";

export const sortArray = (arr) => {
  let sorted = [];
  for (const entry in arr) {
    sorted.push([entry, arr[entry]]);
  }
  sorted.sort(function (a, b) {
    return b[1] - a[1];
  });
  return sorted;
};

export const createBlankLetterRow = num => {
  const letterRow = [];
  for (let i = 0; i < num; i++) {
    letterRow.push({ id: i, letter: '', status: 'absent' });
  }
  return letterRow;
};

export const createDataObj = async guessedWords => {
  const correctLetters = [];
  const presentLetters = [];
  const absentLetters = [];

  guessedWords.forEach(({ letters }) => {
    letters.forEach(letter => {
      if (letter.letter !== '') {
        switch (letter.status) {
          case 'present':
            presentLetters.push(letter);
            break;
          case 'correct':
            correctLetters.push(letter);
            break;
          default:
            absentLetters.push(letter);
        }
      }
    });
  });

  // Get duplicate letter information
  const confLetterCount = {};
  guessedWords.forEach(word => {
    const wordLetterCount = {};
    word.letters.forEach(({ status, letter }) => {
      if (status === 'present' || status === 'correct') {
        wordLetterCount[letter] = (wordLetterCount[letter] || 0) + 1;
      }
    });

    // Loop through this word's confirmed letter count
    for (const [key, value] of Object.entries(wordLetterCount)) {
      // Update overall letter count if it does not have this information
      if (!Object.prototype.hasOwnProperty.call(confLetterCount, key) || confLetterCount[key] < value) {
        confLetterCount[key] = value;
      }
    }
  });

  return { confLetterCount, correctLetters, presentLetters, absentLetters };
};

export const generateResults = async (data, wordsArr = POSSIBLE_ANSWERS) => {
  const { correctLetters, absentLetters, presentLetters, confLetterCount } = data;
  // Build word info object
  const wordInfo = {
    'char-0': { is: '', isNot: '' },
    'char-1': { is: '', isNot: '' },
    'char-2': { is: '', isNot: '' },
    'char-3': { is: '', isNot: '' },
    'char-4': { is: '', isNot: '' }
  };

  // Add CORRECT information
  if (correctLetters.length > 0) {
    correctLetters.forEach(letter => {
      wordInfo[`char-${letter.id}`].is = letter.letter;
    });
  }

  // Add ABSENT information
  if (absentLetters.length > 0) {
    const presentLettersArr = [...presentLetters].map(({ letter }) => letter);

    absentLetters.forEach(absentLetter => {
      // Check absent letter is not also marked as 'present'
      if (!presentLettersArr.some(presentLetter => presentLetter === absentLetter.letter)) {
        for (let i = 0; i < Object.keys(wordInfo).length; i++) {
          const wordInfoChar = wordInfo[`char-${i}`];
          if (wordInfoChar.is === '') {
            wordInfoChar.isNot += absentLetter.letter;
          }
        }
      } else {
        // Mark letter absent for that char position only
        wordInfo[`char-${absentLetter.id}`].isNot += absentLetter.letter;
      }
    });
  }

  // Add PRESENT information
  if (presentLetters.length > 0) {
    presentLetters.forEach(letter => {
      wordInfo[`char-${letter.id}`].isNot += letter.letter;
    });
  }

  // Build regex
  let regexString = '^';
  for (const [letter, count] of Object.entries(confLetterCount)) {
    let str = '';
    // Loop in case there is a clue about duplicate letters
    for (let i = 0; i < count; i++) {
      str += `.*${letter}`;
    }
    // Add lookahead for confirmed letters
    regexString += `(?=${str})`;
  }
  Object.values(wordInfo).forEach(char => {
    let str = char.is !== '' ? `[${char.is}]` : `[^${char.isNot}]`;
    regexString += str;
  });
  regexString += '$';

  const regex = new RegExp(regexString, 'i');

  const absentLettersArr = absentLetters.map(({letter}) => letter);
  const confLettersRegexes = [];
  for (const [letter, count] of Object.entries(confLetterCount)) {
    confLettersRegexes.push({count, letter, regex: new RegExp(letter, 'gi')});
  }

  const filteredAnswers = wordsArr.filter(word => {
    const passesMainRegex = regex.test(word);
    let passesCharCount = true;

    if (passesMainRegex && confLettersRegexes.length > 0) {
      confLettersRegexes.forEach(confLetter => {
        const letterIsMarkedAbsent = absentLettersArr.length > 0 && absentLettersArr.includes(confLetter.letter);
        // If letter is marked ABSENT and PRESENT, then we know more about the number of occurrences
        if (letterIsMarkedAbsent && word.match(confLetter.regex).length !== confLetter.count) {
          passesCharCount = false;
        }
      });
    }

    return passesMainRegex && passesCharCount;
  });

  let letterScores = {};
  filteredAnswers.forEach(word => {
    let unknownLetters = word;
    for (const [letter, count] of Object.entries(confLetterCount)) {
      for (let i = 0; i < count; i++) {
        // Remove COUNT instances of LETTER from the word
        unknownLetters = unknownLetters.replace(letter, '');
      }
    }

    if (unknownLetters.length > 0) {
      unknownLetters.split('').forEach(unknownLetter => {
        letterScores[unknownLetter] = (letterScores[unknownLetter] || 0) + 1;
      });
    }
  });

  letterScores = sortArray(letterScores);

  return {
    filteredAnswers,
    letterScores
  };
};
