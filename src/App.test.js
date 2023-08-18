import React from 'react';
import { screen } from '@testing-library/react';
import { render } from './test-utils';
import App from './App';

test('renders the initial login page', () => {
  render(<App />);
  const welcome = screen.getByText(/Flightbag/i);
  const instructions = screen.getByText(
    /Enter your simbrief username to get started!/i
  );
  expect(welcome).toBeInTheDocument();
  expect(instructions).toBeInTheDocument();
});
