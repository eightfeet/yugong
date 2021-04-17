import React from 'react';
import { render, screen } from '@testing-library/react';
import Output from './Output';

test('renders learn react link', () => {
  render(<Output />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
