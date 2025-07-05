// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference types="vitest" />

import { render, screen, fireEvent } from '@testing-library/react';
import type { User } from '../types/types';
import { vi } from 'vitest';
import UserList from '../components/UserList';

describe('UserList', () => {
  const dummyUsers: User[] = [
    {
      id: 1,
      login: 'asruldev',
      avatar_url: 'https://avatars.githubusercontent.com/u/1',
      html_url: "https://github.com/asruldev",
      type: 'User',
      site_admin: false
    },
    {
      id: 2,
      login: 'anisfikriyyah',
      avatar_url: 'https://avatars.githubusercontent.com/u/2',
      html_url: "https://github.com/anisfikriyyah",
      type: 'User',
      site_admin: false
    },
  ];

  it('renders a list of users with avatars and names', () => {
    render(<UserList users={dummyUsers} onSelect={() => {}} />);

    // Check user names
    expect(screen.getByText('asruldev')).toBeInTheDocument();
    expect(screen.getByText('anisfikriyyah')).toBeInTheDocument();
    
    // Check user logins
    expect(screen.getByText('@asruldev')).toBeInTheDocument();
    expect(screen.getByText('@anisfikriyyah')).toBeInTheDocument();
  });

  it('calls onSelect when a user is clicked', () => {
    const mockSelect = vi.fn();
    render(<UserList users={dummyUsers} onSelect={mockSelect} />);

    // Click first user
    const firstUser = screen.getByText('asruldev');
    fireEvent.click(firstUser);

    expect(mockSelect).toHaveBeenCalledWith('asruldev');

    // Click second user
    const secondUser = screen.getByText('anisfikriyyah');
    fireEvent.click(secondUser);

    expect(mockSelect).toHaveBeenCalledWith('anisfikriyyah');
  });

  it('renders nothing if user list is empty', () => {
    const { container } = render(<UserList users={[]} onSelect={() => {}} />);
    expect(container.querySelector('.user-list')).not.toBeInTheDocument();
  });
});
