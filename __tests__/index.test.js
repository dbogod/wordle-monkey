import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import Home from '../pages/index';

describe('Home', () => {

  test('renders intro text', () => {
    render(<Home />);

    const introTextElement = screen.getByText(/Wordle Monkey to the rescue!/);
    expect(introTextElement).toBeInTheDocument();
  });
});