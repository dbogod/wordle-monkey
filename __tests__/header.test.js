import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from '../components/Header';

describe('Header', () => {
  it('renders a heading', () => {
    render(<Header />)

    const heading = screen.getByRole('heading', {
      name: 'Wordle Monkey',
    })

    expect(heading).toBeInTheDocument()
  })
})