import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import Results from '../components/Results';
import { createDataObj, generateResults } from '../components/utilities/helpers';

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

  test('renders an error', async () => {
    const dataObj = await createDataObj(testGuessedWords);
    const results = await generateResults(dataObj);
    window.HTMLElement.prototype.scrollIntoView = function() {};
    render(<Results data={results}/>);

    const errorElement = screen.getByText(/There are no matching words! Please click the ‘back‘ button above and check the letters are correct/);
    expect(errorElement).toBeInTheDocument();
  });
});