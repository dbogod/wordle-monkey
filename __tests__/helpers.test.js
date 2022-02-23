import '@testing-library/jest-dom';
import { createDataObj, generateResults } from '../components/utilities/helpers';

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

const dataObj = await createDataObj(testGuessedWords);
const results = await generateResults(dataObj);

describe('createDataObj', () => {
  it('returns the right object', async () => {
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
});

describe('generateResults', () => {
  it('returns expected words', async () => {
    expect(results.filteredAnswers).toEqual([
      'banal',
      'canal'
    ]);
  });
});