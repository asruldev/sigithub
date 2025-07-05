/// <reference types="vitest" />

import { render, screen } from '@testing-library/react';
import type { Repo } from '../types/types';
import RepoList from '../components/RepoList';

describe('RepoList', () => {
  const dummyRepos: Repo[] = [
    {
      id: 1,
      name: 'repo-one',
      full_name: 'user/repo-one',
      html_url: 'https://github.com/user/repo-one',
      description: 'First repo',
      stargazers_count: 42,
      forks_count: 10,
      language: 'JavaScript',
      updated_at: '2023-01-01T00:00:00Z',
      created_at: '2023-01-01T00:00:00Z',
      pushed_at: '2023-01-01T00:00:00Z',
      size: 1000,
      private: false,
      fork: false,
      archived: false,
      disabled: false,
      default_branch: 'main',
      topics: [],
      visibility: 'public',
      watchers_count: 5,
      open_issues_count: 2
    },
    {
      id: 2,
      name: 'repo-two',
      full_name: 'user/repo-two',
      html_url: 'https://github.com/user/repo-two',
      description: 'Second repo',
      stargazers_count: 7,
      forks_count: 3,
      language: 'TypeScript',
      updated_at: '2023-01-01T00:00:00Z',
      created_at: '2023-01-01T00:00:00Z',
      pushed_at: '2023-01-01T00:00:00Z',
      size: 500,
      private: false,
      fork: false,
      archived: false,
      disabled: false,
      default_branch: 'main',
      topics: [],
      visibility: 'public',
      watchers_count: 2,
      open_issues_count: 1
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

  it('renders empty state when repos is empty', () => {
    render(<RepoList repos={[]} />);
    expect(screen.getByText('No repositories found')).toBeInTheDocument();
    expect(screen.getByText("This user doesn't have any public repositories yet.")).toBeInTheDocument();
  });

  it('formats star counts correctly', () => {
    const reposWithHighStars: Repo[] = [
      {
        ...dummyRepos[0],
        id: 999,
        name: dummyRepos[0]!.name,
        full_name: dummyRepos[0]!.full_name,
        html_url: dummyRepos[0]!.html_url,
        description: dummyRepos[0]!.description,
        stargazers_count: 1500,
        forks_count: dummyRepos[0]!.forks_count,
        language: dummyRepos[0]!.language,
        updated_at: dummyRepos[0]!.updated_at,
        created_at: dummyRepos[0]!.created_at,
        pushed_at: dummyRepos[0]!.pushed_at,
        size: dummyRepos[0]!.size,
        private: dummyRepos[0]!.private,
        fork: dummyRepos[0]!.fork,
        archived: dummyRepos[0]!.archived,
        disabled: dummyRepos[0]!.disabled,
        default_branch: dummyRepos[0]!.default_branch,
        topics: dummyRepos[0]!.topics,
        visibility: dummyRepos[0]!.visibility,
        watchers_count: dummyRepos[0]!.watchers_count,
        open_issues_count: dummyRepos[0]!.open_issues_count
      }
    ];
    
    render(<RepoList repos={reposWithHighStars} />);
    expect(screen.getByText('1.5k')).toBeInTheDocument();
  });
});
