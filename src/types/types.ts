export interface User {
  id: number;
  login: string;
  avatar_url: string;
  html_url: string;
  type: string;
  site_admin: boolean;
  score?: number;
  name?: string;
  bio?: string;
  location?: string;
  company?: string;
  blog?: string;
  email?: string;
  twitter_username?: string;
  public_repos?: number;
  public_gists?: number;
  followers?: number;
  following?: number;
  created_at?: string;
  updated_at?: string;
}

export interface Repo {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  updated_at: string;
  created_at: string;
  pushed_at: string;
  size: number;
  private: boolean;
  fork: boolean;
  archived: boolean;
  disabled: boolean;
  default_branch: string;
  topics: string[];
  visibility: string;
  watchers_count: number;
  open_issues_count: number;
  license?: {
    key: string;
    name: string;
    url: string;
  } | null;
}

export interface SearchResponse {
  total_count: number;
  incomplete_results: boolean;
  items: User[];
}

export interface RateLimitInfo {
  limit: number;
  remaining: number;
  reset: number;
  used: number;
}

export interface RateLimitResponse {
  resources: {
    core: RateLimitInfo;
    search: RateLimitInfo;
    graphql: RateLimitInfo;
  };
}

export interface Organization {
  id: number;
  login: string;
  avatar_url: string;
  html_url: string;
  name?: string;
  description?: string;
  type: string;
}

export interface Gist {
  id: string;
  html_url: string;
  git_pull_url: string;
  git_push_url: string;
  commits_url: string;
  description: string;
  comments: number;
  user: User;
  truncated: boolean;
  files: Record<string, {
    filename: string;
    type: string;
    language: string;
    raw_url: string;
    size: number;
    truncated: boolean;
    content: string;
  }>;
  public: boolean;
  created_at: string;
  updated_at: string;
  owner: User;
}

export interface UserWithRepos extends User {
  repos?: Repo[];
  expanded?: boolean;
  followersList?: User[];
  followingList?: User[];
  organizationsList?: Organization[];
  starredList?: Repo[];
  gistsList?: Gist[];
  followersExpanded?: boolean;
  followingExpanded?: boolean;
  organizationsExpanded?: boolean;
  starredExpanded?: boolean;
  gistsExpanded?: boolean;
  loading?: boolean;
}

export interface SearchState {
  query: string;
  users: UserWithRepos[];
  loading: boolean;
  error: string | null;
  totalCount: number;
}