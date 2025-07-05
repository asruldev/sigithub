import React from 'react';
import type { Repo } from '../types/types';

interface Props {
  repos: Repo[];
}

const RepoList: React.FC<Props> = ({ repos }) => {
  const formatNumber = (num: number): string => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k';
    }
    return num.toString();
  };

  if (repos.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">📁</div>
        <div className="empty-title">No repositories found</div>
        <div className="empty-description">
          This user doesn't have any public repositories yet.
        </div>
      </div>
    );
  }

  return (
    <div className="repo-list">
      {repos.map((repo) => (
        <div key={repo.id} className="repo-item">
          <div className="repo-info">
            <a
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="repo-name"
            >
              {repo.name}
            </a>
            <p className="repo-description">
              {repo.description || "No description available"}
            </p>
          </div>
          <div className="repo-stats">
            <span className="star-icon">⭐</span>
            <span>{formatNumber(repo.stargazers_count)}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RepoList;