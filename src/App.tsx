import React, { useState } from "react";
import SearchUser from "./components/SearchUser";
import type { User, Repo, Organization } from "./types/types";
import { searchUsers, getUserRepos, getUserDetail, getUserFollowers, getUserFollowing, getUserOrganizations, getUserStarred } from "./helpers/api";

interface UserWithRepos extends User {
  repos?: Repo[];
  expanded?: boolean;
  followersList?: User[];
  followingList?: User[];
  organizationsList?: Organization[];
  starredList?: Repo[];
  followersExpanded?: boolean;
  followingExpanded?: boolean;
  organizationsExpanded?: boolean;
  starredExpanded?: boolean;
}

const App: React.FC = () => {
  const [users, setUsers] = useState<UserWithRepos[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = async (query: string) => {
    if (!query.trim()) return;
    
    setError("");
    setLoading(true);
    setSearchQuery(query);
    try {
      const data = await searchUsers(query);
      // Ambil detail user secara paralel
      const detailUsers = await Promise.all(
        data.items.map(async (u: User) => {
          try {
            const detail = await getUserDetail(u.login);
            return { ...u, ...detail, expanded: false, repos: [] };
          } catch {
            return { ...u, expanded: false, repos: [] };
          }
        })
      );
      setUsers(detailUsers);
    } catch (err) {
      setError((err as Error).message);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const toggleUser = async (user: UserWithRepos) => {
    setUsers((prev: UserWithRepos[]) =>
      prev.map((u: UserWithRepos) => (u.id === user.id ? { ...u, expanded: !u.expanded } : u))
    );

    if (!user.expanded && user.repos?.length === 0) {
      try {
        const repos = await getUserRepos(user.login);
        setUsers((prev: UserWithRepos[]) =>
          prev.map((u: UserWithRepos) => (u.id === user.id ? { ...u, repos } : u))
        );
      } catch (err) {
        setError((err as Error).message);
      }
    }
  };

  const toggleFollowers = async (user: UserWithRepos) => {
    setUsers((prev: UserWithRepos[]) =>
      prev.map((u: UserWithRepos) => (u.id === user.id ? { ...u, followersExpanded: !u.followersExpanded } : u))
    );

    if (!user.followersExpanded && !user.followersList) {
      try {
        const followers = await getUserFollowers(user.login);
        setUsers((prev: UserWithRepos[]) =>
          prev.map((u: UserWithRepos) => (u.id === user.id ? { ...u, followersList: followers } : u))
        );
      } catch (err) {
        setError((err as Error).message);
      }
    }
  };

  const toggleFollowing = async (user: UserWithRepos) => {
    setUsers((prev: UserWithRepos[]) =>
      prev.map((u: UserWithRepos) => (u.id === user.id ? { ...u, followingExpanded: !u.followingExpanded } : u))
    );

    if (!user.followingExpanded && !user.followingList) {
      try {
        const following = await getUserFollowing(user.login);
        setUsers((prev: UserWithRepos[]) =>
          prev.map((u: UserWithRepos) => (u.id === user.id ? { ...u, followingList: following } : u))
        );
      } catch (err) {
        setError((err as Error).message);
      }
    }
  };

  const toggleOrganizations = async (user: UserWithRepos) => {
    setUsers((prev: UserWithRepos[]) =>
      prev.map((u: UserWithRepos) => (u.id === user.id ? { ...u, organizationsExpanded: !u.organizationsExpanded } : u))
    );

    if (!user.organizationsExpanded && !user.organizationsList) {
      try {
        const organizations = await getUserOrganizations(user.login);
        setUsers((prev: UserWithRepos[]) =>
          prev.map((u: UserWithRepos) => (u.id === user.id ? { ...u, organizationsList: organizations } : u))
        );
      } catch (err) {
        setError((err as Error).message);
      }
    }
  };

  const toggleStarred = async (user: UserWithRepos) => {
    setUsers((prev: UserWithRepos[]) =>
      prev.map((u: UserWithRepos) => (u.id === user.id ? { ...u, starredExpanded: !u.starredExpanded } : u))
    );

    if (!user.starredExpanded && !user.starredList) {
      try {
        const starred = await getUserStarred(user.login);
        setUsers((prev: UserWithRepos[]) =>
          prev.map((u: UserWithRepos) => (u.id === user.id ? { ...u, starredList: starred } : u))
        );
      } catch (err) {
        setError((err as Error).message);
      }
    }
  };

  const formatNumber = (num: number): string => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k';
    }
    return num.toString();
  };

  return (
    <div className="container">
      <header className="app-header">
        <h1 className="app-title">GitHub Explorer</h1>
        <p className="app-subtitle">Discover GitHub users and explore their repositories</p>
      </header>

      <div className="search-container">
        <SearchUser onSearch={handleSearch} />
      </div>

      {loading && (
        <div className="loading-container">
          <div className="spinner"></div>
          <p className="loading-text">Searching for users...</p>
        </div>
      )}

      {error && (
        <div className="error-message">
          <span>⚠️</span>
          {error}
        </div>
      )}

      {!loading && !error && users.length > 0 && (
        <div className="search-results">
          <p className="results-count">
            Found {users.length} user{users.length !== 1 ? 's' : ''} for "{searchQuery}"
          </p>
          
          <div className="user-list">
            {users.map((user) => (
              <div
                key={user.id}
                className={`user-card ${user.expanded ? "expanded" : ""}`}
              >
                <div className="user-header" onClick={() => toggleUser(user)}>
                  <div className="user-info">
                    <img 
                      src={user.avatar_url} 
                      alt={`${user.login} avatar`}
                      className="user-avatar"
                      loading="lazy"
                    />
                    <div className="user-details">
                      <a
                        href={user.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="user-name"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {user.name || user.login}
                      </a>
                      <span className="user-login">@{user.login}</span>
                      {user.bio && <span className="user-bio">{user.bio}</span>}
                      <div className="user-meta">
                        {user.company && <span>🏢 {user.company}</span>}
                        {user.location && <span>📍 {user.location}</span>}
                        {user.blog && <a href={user.blog.startsWith('http') ? user.blog : `https://${user.blog}`} target="_blank" rel="noopener noreferrer">🔗 Blog</a>}
                        {user.twitter_username && <a href={`https://twitter.com/${user.twitter_username}`} target="_blank" rel="noopener noreferrer">🐦 @{user.twitter_username}</a>}
                      </div>
                      <div className="user-stats">
                        <span>👥 {formatNumber(user.followers ?? 0)} followers</span>
                        <span>• {formatNumber(user.following ?? 0)} following</span>
                        <span>• 📦 {formatNumber(user.public_repos ?? 0)} repos</span>
                        <span>• 📝 {formatNumber(user.public_gists ?? 0)} gists</span>
                      </div>
                    </div>
                  </div>
                  <span className="expand-icon">
                    {user.expanded ? "▼" : "▶"}
                  </span>
                </div>
                
                {user.expanded && (
                  <div className="user-expanded-content">
                    {/* Organizations Section */}
                    <div className="organizations-section">
                      <div className="section-header" onClick={() => toggleOrganizations(user)}>
                        <h3>🏢 Organizations</h3>
                        <span className="expand-icon">
                          {user.organizationsExpanded ? "▼" : "▶"}
                        </span>
                      </div>
                      {user.organizationsExpanded && (
                        <div className="organizations-list">
                          {user.organizationsList && user.organizationsList.length > 0 ? (
                            user.organizationsList.map((org) => (
                              <div key={org.id} className="organization-item">
                                <img src={org.avatar_url} alt={org.login} className="organization-avatar" />
                                <div className="organization-info">
                                  <a href={org.html_url} target="_blank" rel="noopener noreferrer" className="organization-name">
                                    {org.name || org.login}
                                  </a>
                                  {org.description && <p className="organization-description">{org.description}</p>}
                                </div>
                              </div>
                            ))
                          ) : (
                            <div className="empty-state">
                              <div className="empty-icon">🏢</div>
                              <div className="empty-title">No organizations found</div>
                              <div className="empty-description">
                                This user is not a member of any public organizations.
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Starred Repositories Section */}
                    <div className="starred-section">
                      <div className="section-header" onClick={() => toggleStarred(user)}>
                        <h3>⭐ Starred Repositories</h3>
                        <span className="expand-icon">
                          {user.starredExpanded ? "▼" : "▶"}
                        </span>
                      </div>
                      {user.starredExpanded && (
                        <div className="starred-list">
                          {user.starredList && user.starredList.length > 0 ? (
                            user.starredList.map((repo) => (
                              <div key={repo.id} className="starred-item">
                                <div className="starred-info">
                                  <a
                                    href={repo.html_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="starred-name"
                                  >
                                    {repo.full_name}
                                  </a>
                                  <p className="starred-description">
                                    {repo.description || "No description available"}
                                  </p>
                                  <div className="starred-meta">
                                    <span className="starred-language">{repo.language}</span>
                                    <span className="starred-stars">⭐ {formatNumber(repo.stargazers_count)}</span>
                                    <span className="starred-forks">🍴 {formatNumber(repo.forks_count)}</span>
                                  </div>
                                </div>
                              </div>
                            ))
                          ) : (
                            <div className="empty-state">
                              <div className="empty-icon">⭐</div>
                              <div className="empty-title">No starred repositories found</div>
                              <div className="empty-description">
                                This user hasn't starred any public repositories.
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Followers Section */}
                    <div className="followers-section">
                      <div className="section-header" onClick={() => toggleFollowers(user)}>
                        <h3>👥 Followers ({formatNumber(user.followers ?? 0)})</h3>
                        <span className="expand-icon">
                          {user.followersExpanded ? "▼" : "▶"}
                        </span>
                      </div>
                      {user.followersExpanded && (
                        <div className="followers-list">
                          {user.followersList && user.followersList.length > 0 ? (
                            user.followersList.map((follower) => (
                              <div key={follower.id} className="follower-item">
                                <img src={follower.avatar_url} alt={follower.login} className="follower-avatar" />
                                <a href={follower.html_url} target="_blank" rel="noopener noreferrer" className="follower-name">
                                  {follower.login}
                                </a>
                              </div>
                            ))
                          ) : (
                            <div className="empty-state">
                              <div className="empty-icon">👥</div>
                              <div className="empty-title">Loading followers...</div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Following Section */}
                    <div className="following-section">
                      <div className="section-header" onClick={() => toggleFollowing(user)}>
                        <h3>👤 Following ({formatNumber(user.following ?? 0)})</h3>
                        <span className="expand-icon">
                          {user.followingExpanded ? "▼" : "▶"}
                        </span>
                      </div>
                      {user.followingExpanded && (
                        <div className="following-list">
                          {user.followingList && user.followingList.length > 0 ? (
                            user.followingList.map((following) => (
                              <div key={following.id} className="following-item">
                                <img src={following.avatar_url} alt={following.login} className="following-avatar" />
                                <a href={following.html_url} target="_blank" rel="noopener noreferrer" className="following-name">
                                  {following.login}
                                </a>
                              </div>
                            ))
                          ) : (
                            <div className="empty-state">
                              <div className="empty-icon">👤</div>
                              <div className="empty-title">Loading following...</div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Repositories Section */}
                    <div className="repositories-section">
                      <h3>📦 Repositories</h3>
                      <div className="repo-list">
                        {user.repos && user.repos.length > 0 ? (
                          user.repos.map((repo) => (
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
                          ))
                        ) : (
                          <div className="empty-state">
                            <div className="empty-icon">📁</div>
                            <div className="empty-title">No repositories found</div>
                            <div className="empty-description">
                              This user doesn't have any public repositories yet.
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {!loading && !error && users.length === 0 && searchQuery && (
        <div className="empty-state">
          <div className="empty-icon">🔍</div>
          <div className="empty-title">No users found</div>
          <div className="empty-description">
            Try searching for a different username or check your spelling.
          </div>
        </div>
      )}

      {!loading && !error && users.length === 0 && !searchQuery && (
        <div className="empty-state">
          <div className="empty-icon">🚀</div>
          <div className="empty-title">Welcome to GitHub Explorer</div>
          <div className="empty-description">
            Search for GitHub users above to discover their repositories and projects.
          </div>
        </div>
      )}

      <div className="keyboard-shortcuts">
        <span>Press <kbd className="shortcut">/</kbd> or <kbd className="shortcut">Ctrl+K</kbd> to search</span>
      </div>
    </div>
  );
};

export default App;
