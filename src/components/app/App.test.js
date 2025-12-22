import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the Reddit-style search input', () => {
  render(<App />);
  const searchInput = screen.getByPlaceholderText(/Search Reddit/i);
  expect(searchInput).toBeInTheDocument();
});
