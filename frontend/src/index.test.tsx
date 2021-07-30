import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './navigation';

test('renders the invoices page', () => {
  render(<App />);
  const tileElement = screen.getByText(/Invoices/i);
  expect(tileElement).toBeInTheDocument();
});
