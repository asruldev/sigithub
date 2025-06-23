/// <reference types="vitest" />

import { render, screen } from '@testing-library/react';
import type { Repo } from '../types/types';
import RepoList from '../components/RepoList';

describe('RepoList', () => {
  const dummyRepos: Repo[] = [
    {
      id: 1,
      name: 'repo-one',
      html_url: 'https://github.com/user/repo-one',
      description: 'First repo',
      stargazers_count: 42,
    },
    {
      id: 2,
      name: 'repo-two',
      html_url: 'https://github.com/user/repo-two',
      description: 'Second repo',
      stargazers_count: 7,
    },
  ];

  it('renders a list of repositories with names and descriptions', () => {
    render(<RepoList repos={dummyRepos} />);

    // Check repo names
    expect(screen.getByText('repo-one')).toBeInTheDocument();
    expect(screen.getByText('repo-two')).toBeInTheDocument();

    // Check repo descriptions
    expect(screen.getByText('First repo')).toBeInTheDocument();
    expect(screen.getByText('Second repo')).toBeInTheDocument();

    // Check link href
    expect(screen.getByText('repo-one').closest('a')).toHaveAttribute(
      'href',
      'https://github.com/user/repo-one'
    );
  });

  it('renders empty when repos is empty', () => {
    const { container } = render(<RepoList repos={[]} />);
    expect(container.querySelectorAll('li').length).toBe(0);
  });
});
