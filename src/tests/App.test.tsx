import { render, screen } from '@testing-library/react';
import App from '../App';

describe('App', () => {
  it('renders heading', () => {
    render(<App />);
    expect(screen.getByRole('heading', { name: /GitHub Explorer/i })).toBeInTheDocument();
  });

  it('renders search form', () => {
    render(<App />);
    expect(screen.getByPlaceholderText(/search github users/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
  });

  it('renders welcome message when no search is performed', () => {
    render(<App />);
    expect(screen.getByText(/Welcome to GitHub Explorer/i)).toBeInTheDocument();
    expect(screen.getByText(/Search for GitHub users above/i)).toBeInTheDocument();
  });
});