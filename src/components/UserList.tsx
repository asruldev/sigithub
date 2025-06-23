import React from 'react';
import type { User } from '../types/types';

interface Props {
  users: User[];
  onSelect: (username: string) => void;
}

const UserList: React.FC<Props> = ({ users, onSelect }) => {
  return (
    <ul>
      {users.map((user) => (
        <li key={user.id} onClick={() => onSelect(user.login)}>
          <img src={user.avatar_url} alt={user.login} width={30} /> {user.login}
        </li>
      ))}
    </ul>
  );
};

export default UserList;