import React from 'react';
import type { Repo } from '../types/types';

interface Props {
  repos: Repo[];
}

const RepoList: React.FC<Props> = ({ repos }) => {
  return (
    <ul>
      {repos.map((repo) => (
        <li key={repo.id}>
          <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
            {repo.name}
          </a>
          <p>{repo.description}</p>
        </li>
      ))}
    </ul>
  );
};

export default RepoList;