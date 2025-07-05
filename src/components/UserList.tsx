import React from 'react';
import type { User } from '../types/types';

interface Props {
  users: User[];
  onSelect: (username: string) => void;
}

const UserList: React.FC<Props> = ({ users, onSelect }) => {
  if (users.length === 0) {
    return null;
  }

  return (
    <div className="user-list">
      {users.map((user) => (
        <div key={user.id} className="user-card" onClick={() => onSelect(user.login)}>
          <div className="user-header">
            <div className="user-info">
              <img 
                src={user.avatar_url} 
                alt={`${user.login} avatar`}
                className="user-avatar"
                loading="lazy"
              />
              <div className="user-details">
                <span className="user-name">{user.login}</span>
                <span className="user-login">@{user.login}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserList;