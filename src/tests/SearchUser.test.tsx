// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference types="vitest" />

import { render, screen, fireEvent } from '@testing-library/react';
import SearchUser from '../components/SearchUser';
import { vi } from 'vitest';

describe('SearchUser Component', () => {
  it('renders input and button', () => {
    render(<SearchUser onSearch={() => {}} />);
    expect(screen.getByPlaceholderText(/search github users/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
  });

  it('calls onSearch with input value on submit', () => {
    const mockSearch = vi.fn();
    render(<SearchUser onSearch={mockSearch} />);
    const input = screen.getByPlaceholderText(/search github users/i);
    fireEvent.change(input, { target: { value: 'react' } });
    fireEvent.submit(input.closest('form')!);
    expect(mockSearch).toHaveBeenCalledWith('react');
  });
});