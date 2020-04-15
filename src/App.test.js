import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders cards label', () => {
  const { getByText } = render(<App />);
  const cardLabel = getByText(/All Cards:/i);
  expect(cardLabel).toBeInTheDocument();
});
