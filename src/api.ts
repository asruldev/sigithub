export const searchUsers = async (query: string) => {
  const response = await fetch(`https://api.github.com/search/users?q=${query}&per_page=5`);
  if (!response.ok) {
    throw new Error('Failed to fetch users');
  }
  return response.json();
};

export const getUserRepos = async (username: string) => {
  const response = await fetch(`https://api.github.com/users/${username}/repos`);
  if (!response.ok) {
    throw new Error('Failed to fetch repositories');
  }
  return response.json();
};