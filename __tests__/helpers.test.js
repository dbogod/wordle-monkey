import '@testing-library/jest-dom';
import { convertObjToSortedArray, createDataObj, generateResults } from '../components/utilities/helpers';

describe('sortArray returns a sorted array', () => {
  const unsortedObj = {'o': 41, 'd': 62, 'a': 1, 'x': 2};
  const sortedArray = [['d', 62], ['o', 41], ['x', 2], ['a', 1]];
  const result = convertObjToSortedArray(unsortedObj);
  test('returns an array', () => {
    const isArray = Array.isArray(result);
    expect(isArray).toBeTruthy();
  });
  test('array is sorted', () => {
    expect(result).toEqual(sortedArray);
  });
});

describe('ANNAL, UNION, ALLOY', () => {
  const testGuessedWords = [
    {
      wordId: 0,
      letters: [
        { id: 0, letter: 'a', status: 'present' },
        { id: 1, letter: 'n', status: 'absent' },
        { id: 2, letter: 'n', status: 'correct' },
        { id: 3, letter: 'a', status: 'correct' },
        { id: 4, letter: 'l', status: 'correct' },
      ]
    },
    {
      wordId: 1,
      letters: [
        { id: 0, letter: 'u', status: 'absent' },
        { id: 1, letter: 'n', status: 'present' },
        { id: 2, letter: 'i', status: 'absent' },
        { id: 3, letter: 'o', status: 'absent' },
        { id: 4, letter: 'n', status: 'absent' },
      ]
    },
    {
      wordId: 2,
      letters: [
        { id: 0, letter: 'a', status: 'present' },
        { id: 1, letter: 'l', status: 'present' },
        { id: 2, letter: 'l', status: 'absent' },
        { id: 3, letter: 'o', status: 'absent' },
        { id: 4, letter: 'y', status: 'absent' },
      ]
    }
  ];

  test('createDataObj returns the right object', async () => {
    const dataObj = await createDataObj(testGuessedWords);
    expect(dataObj).toEqual({
      absentLetters: [
        { id: 1, letter: 'n', status: 'absent' },
        { id: 0, letter: 'u', status: 'absent' },
        { id: 2, letter: 'i', status: 'absent' },
        { id: 3, letter: 'o', status: 'absent' },
        { id: 4, letter: 'n', status: 'absent' },
        { id: 2, letter: 'l', status: 'absent' },
        { id: 3, letter: 'o', status: 'absent' },
        { id: 4, letter: 'y', status: 'absent' }
      ],
      confLetterCount: {
        a: 2,
        l: 1,
        n: 1
      },
      correctLetters: [
        { id: 2, letter: 'n', status: 'correct' },
        { id: 3, letter: 'a', status: 'correct' },
        { id: 4, letter: 'l', status: 'correct' },
      ],
      presentLetters: [
        { id: 0, letter: 'a', status: 'present' },
        { id: 1, letter: 'n', status: 'present' },
        { id: 0, letter: 'a', status: 'present' },
        { id: 1, letter: 'l', status: 'present' },
      ]
    });
  });

  test('generateResults returns expected words', async () => {
    const dataObj = await createDataObj(testGuessedWords);
    const results = await generateResults(dataObj);
    expect(results.filteredAnswers).toEqual([
      'banal',
      'canal'
    ]);
  });
});

describe('TREAT', () => {
  const testGuessedWords = [
    {
      wordId: 0,
      letters: [
        { id: 0, letter: 't', status: 'present' },
        { id: 1, letter: 'r', status: 'absent' },
        { id: 2, letter: 'e', status: 'absent' },
        { id: 3, letter: 'a', status: 'absent' },
        { id: 4, letter: 't', status: 'absent' },
      ]
    }
  ];

  test('returns the right number of words', async () => {
    const dataObj = await createDataObj(testGuessedWords);
    const results = await generateResults(dataObj);
    expect(results.filteredAnswers.length).toBe(67);
  });

  test('returns expected results', async () => {
    const dataObj = await createDataObj(testGuessedWords);
    const results = await generateResults(dataObj);
    expect(results.filteredAnswers).toContain('stool');
    expect(results.filteredAnswers).toContain('outdo');
    expect(results.letterScores).toContainEqual(['o', 41]);

    const fiveLetterWordsContainingOneT = results.filteredAnswers.filter(word => {
      const isString = typeof word === 'string';
      const containsFiveLetters = /^[a-z]{5}$/.test(word.toString());
      const containsT = word.includes('t');
      const hasOnlyOneT = word.replace(/[^t]/g, '').length === 1;
      const firstCharIsNotT = word.charAt(0) !== 't';
      const lastCharIsNotT = word.charAt(4) !== 't';

      return (
        isString &&
        containsFiveLetters &&
        containsT &&
        hasOnlyOneT &&
        firstCharIsNotT &&
        lastCharIsNotT
      );
    });
    expect(fiveLetterWordsContainingOneT.length).toEqual(results.filteredAnswers.length);
  });
});

describe('AFFIX', () => {
  const testGuessedWords = [
    {
      wordId: 0,
      letters: [
        { id: 0, letter: 'a', status: 'absent' },
        { id: 1, letter: 'f', status: 'present' },
        { id: 2, letter: 'f', status: 'absent' },
        { id: 3, letter: 'i', status: 'absent' },
        { id: 4, letter: 'x', status: 'correct' },
      ]
    }
  ];

  test('returns no words', async () => {
    const dataObj = await createDataObj(testGuessedWords);
    const results = await generateResults(dataObj);
    expect(results.filteredAnswers.length).toBe(0);
  });
});