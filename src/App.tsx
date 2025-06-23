import React, { useState } from "react";
import SearchUser from "./components/SearchUser";
import type { User, Repo } from "./types/types";
import { searchUsers, getUserRepos } from "./helpers/api";

interface UserWithRepos extends User {
  repos?: Repo[];
  expanded?: boolean;
}

const App: React.FC = () => {
  const [users, setUsers] = useState<UserWithRepos[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = async (query: string) => {
    setError("");
    setLoading(true);
    setSearchQuery(query);
    try {
      const data = await searchUsers(query);
      const newUsers = data.items.map((u: User) => ({
        ...u,
        expanded: false,
        repos: [],
      }));
      setUsers(newUsers);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const toggleUser = async (user: UserWithRepos) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === user.id ? { ...u, expanded: !u.expanded } : u))
    );

    if (!user.expanded && user.repos?.length === 0) {
      try {
        const repos = await getUserRepos(user.login);
        setUsers((prev) =>
          prev.map((u) => (u.id === user.id ? { ...u, repos } : u))
        );
      } catch (err) {
        setError((err as Error).message);
      }
    }
  };

  return (
    <div className="container">
      <h1>GitHub Explorer</h1>
      <SearchUser onSearch={handleSearch} />
      {loading && (
        <div className="loading">
          <div className="spinner"></div>
          <p>Loading...</p>
        </div>
      )}
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}

      {users.length > 0 && <p>Showing users for “{searchQuery}”</p>}

      <div className="user-list">
        {users.map((user) => (
          <div
            key={user.id}
            className={`user-card ${user.expanded ? "expanded" : ""}`}
          >
            <div className="user-header" onClick={() => toggleUser(user)}>
              <strong>
                <a
                  href={user.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {user.login}
                </a>
              </strong>
              <span>{user.expanded ? "▲" : "▼"}</span>
            </div>
            {user.expanded && (
              <div className="repo-list">
                {user.repos?.map((repo) => (
                  <div key={repo.id} className="repo-card">
                    <div className="repo-description">
                      <strong>
                        <a
                          href={repo.html_url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {repo.name}
                        </a>
                      </strong>
                      <p>{repo.description}</p>
                    </div>
                    <div className="stars">{repo.stargazers_count ?? 0} ⭐</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
