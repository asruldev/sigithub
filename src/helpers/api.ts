// GitHub API rate limits
const RATE_LIMIT_REMAINING = 'x-ratelimit-remaining';
const RATE_LIMIT_RESET = 'x-ratelimit-reset';

// Custom error class for API errors
class GitHubAPIError extends Error {
  constructor(message: string, public status?: number, public rateLimitInfo?: any) {
    super(message);
    this.name = 'GitHubAPIError';
  }
}

// Check rate limit from response headers
const checkRateLimit = (response: Response) => {
  const remaining = response.headers.get(RATE_LIMIT_REMAINING);
  const reset = response.headers.get(RATE_LIMIT_RESET);
  
  if (remaining === '0') {
    const resetTime = reset ? new Date(parseInt(reset) * 1000) : null;
    throw new GitHubAPIError(
      'GitHub API rate limit exceeded. Please try again later.',
      429,
      { remaining, reset: resetTime }
    );
  }
  
  return { remaining: parseInt(remaining || '0'), reset };
};

export const searchUsers = async (query: string) => {
  try {
    const response = await fetch(
      `https://api.github.com/search/users?q=${encodeURIComponent(query)}&per_page=5&sort=followers`
    );
    
    checkRateLimit(response);
    
    if (!response.ok) {
      if (response.status === 403) {
        throw new GitHubAPIError('GitHub API rate limit exceeded. Please try again later.', 403);
      }
      if (response.status === 422) {
        throw new GitHubAPIError('Invalid search query. Please try a different search term.', 422);
      }
      throw new GitHubAPIError(`Failed to fetch users: ${response.statusText}`, response.status);
    }
    
    const data = await response.json();
    
    if (!data.items || data.items.length === 0) {
      throw new GitHubAPIError('No users found for this search query.', 404);
    }
    
    return data;
  } catch (error) {
    if (error instanceof GitHubAPIError) {
      throw error;
    }
    throw new GitHubAPIError('Network error. Please check your internet connection.');
  }
};

export const getUserRepos = async (username: string) => {
  try {
    const response = await fetch(
      `https://api.github.com/users/${encodeURIComponent(username)}/repos?sort=stars&per_page=20`
    );
    
    checkRateLimit(response);
    
    if (!response.ok) {
      if (response.status === 404) {
        throw new GitHubAPIError(`User '${username}' not found.`, 404);
      }
      if (response.status === 403) {
        throw new GitHubAPIError('GitHub API rate limit exceeded. Please try again later.', 403);
      }
      throw new GitHubAPIError(`Failed to fetch repositories: ${response.statusText}`, response.status);
    }
    
    const repos = await response.json();
    
    // Sort by stars (descending) and then by name
    return repos.sort((a: any, b: any) => {
      if (b.stargazers_count !== a.stargazers_count) {
        return b.stargazers_count - a.stargazers_count;
      }
      return a.name.localeCompare(b.name);
    });
  } catch (error) {
    if (error instanceof GitHubAPIError) {
      throw error;
    }
    throw new GitHubAPIError('Network error. Please check your internet connection.');
  }
};

// Get rate limit status
export const getRateLimitStatus = async () => {
  try {
    const response = await fetch('https://api.github.com/rate_limit');
    if (!response.ok) {
      throw new Error('Failed to fetch rate limit status');
    }
    return response.json();
  } catch (error) {
    console.warn('Could not fetch rate limit status:', error);
    return null;
  }
};

export const getUserDetail = async (username: string) => {
  try {
    const response = await fetch(`https://api.github.com/users/${encodeURIComponent(username)}`);
    checkRateLimit(response);
    if (!response.ok) {
      throw new GitHubAPIError(`Failed to fetch user detail: ${response.statusText}`, response.status);
    }
    return response.json();
  } catch (error) {
    if (error instanceof GitHubAPIError) {
      throw error;
    }
    throw new GitHubAPIError('Network error. Please check your internet connection.');
  }
};

export const getUserFollowers = async (username: string) => {
  try {
    const response = await fetch(`https://api.github.com/users/${encodeURIComponent(username)}/followers?per_page=10`);
    checkRateLimit(response);
    if (!response.ok) {
      throw new GitHubAPIError(`Failed to fetch followers: ${response.statusText}`, response.status);
    }
    return response.json();
  } catch (error) {
    if (error instanceof GitHubAPIError) {
      throw error;
    }
    throw new GitHubAPIError('Network error. Please check your internet connection.');
  }
};

export const getUserFollowing = async (username: string) => {
  try {
    const response = await fetch(`https://api.github.com/users/${encodeURIComponent(username)}/following?per_page=10`);
    checkRateLimit(response);
    if (!response.ok) {
      throw new GitHubAPIError(`Failed to fetch following: ${response.statusText}`, response.status);
    }
    return response.json();
  } catch (error) {
    if (error instanceof GitHubAPIError) {
      throw error;
    }
    throw new GitHubAPIError('Network error. Please check your internet connection.');
  }
};

export const getUserOrganizations = async (username: string) => {
  try {
    const response = await fetch(`https://api.github.com/users/${encodeURIComponent(username)}/orgs?per_page=10`);
    checkRateLimit(response);
    if (!response.ok) {
      throw new GitHubAPIError(`Failed to fetch organizations: ${response.statusText}`, response.status);
    }
    return response.json();
  } catch (error) {
    if (error instanceof GitHubAPIError) {
      throw error;
    }
    throw new GitHubAPIError('Network error. Please check your internet connection.');
  }
};

export const getUserStarred = async (username: string) => {
  try {
    const response = await fetch(`https://api.github.com/users/${encodeURIComponent(username)}/starred?per_page=10&sort=updated`);
    checkRateLimit(response);
    if (!response.ok) {
      throw new GitHubAPIError(`Failed to fetch starred repositories: ${response.statusText}`, response.status);
    }
    return response.json();
  } catch (error) {
    if (error instanceof GitHubAPIError) {
      throw error;
    }
    throw new GitHubAPIError('Network error. Please check your internet connection.');
  }
};

export const getUserGists = async (username: string) => {
  try {
    const response = await fetch(`https://api.github.com/users/${encodeURIComponent(username)}/gists?per_page=10`);
    checkRateLimit(response);
    if (!response.ok) {
      throw new GitHubAPIError(`Failed to fetch gists: ${response.statusText}`, response.status);
    }
    return response.json();
  } catch (error) {
    if (error instanceof GitHubAPIError) {
      throw error;
    }
    throw new GitHubAPIError('Network error. Please check your internet connection.');
  }
};