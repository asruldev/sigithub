// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference types="vitest" />

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { searchUsers, getUserRepos } from '../helpers/api';

describe('api helpers', () => {
  let mockFetch: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    mockFetch = vi.fn();
    vi.stubGlobal('fetch', mockFetch);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('searchUsers', () => {
    it('calls fetch with correct URL and returns JSON', async () => {
      const mockJson = vi.fn().mockResolvedValue({ items: [{ id: 1, login: 'asruldev' }] });
      mockFetch.mockResolvedValue({
        ok: true,
        json: mockJson,
        headers: {
          get: vi.fn().mockReturnValue('60'), // Rate limit remaining
        },
      } as unknown as Response);

      const result = await searchUsers('asruldev');
      expect(mockFetch).toHaveBeenCalledWith(
        'https://api.github.com/search/users?q=asruldev&per_page=5&sort=followers'
      );
      expect(result).toEqual({ items: [{ id: 1, login: 'asruldev' }] });
    });

    it('throws error if response is not ok', async () => {
      mockFetch.mockResolvedValue({
        ok: false,
        status: 500,
        statusText: 'Internal Server Error',
        headers: {
          get: vi.fn().mockReturnValue('60'),
        },
      } as unknown as Response);

      await expect(searchUsers('fail')).rejects.toThrow('Failed to fetch users: Internal Server Error');
    });

    it('throws error for rate limit exceeded', async () => {
      mockFetch.mockResolvedValue({
        ok: false,
        status: 403,
        statusText: 'Forbidden',
        headers: {
          get: vi.fn().mockReturnValue('0'), // No rate limit remaining
        },
      } as unknown as Response);

      await expect(searchUsers('fail')).rejects.toThrow('GitHub API rate limit exceeded. Please try again later.');
    });

    it('throws error for invalid search query', async () => {
      mockFetch.mockResolvedValue({
        ok: false,
        status: 422,
        statusText: 'Unprocessable Entity',
        headers: {
          get: vi.fn().mockReturnValue('60'),
        },
      } as unknown as Response);

      await expect(searchUsers('')).rejects.toThrow('Invalid search query. Please try a different search term.');
    });

    it('throws error when no users found', async () => {
      const mockJson = vi.fn().mockResolvedValue({ items: [] });
      mockFetch.mockResolvedValue({
        ok: true,
        json: mockJson,
        headers: {
          get: vi.fn().mockReturnValue('60'),
        },
      } as unknown as Response);

      await expect(searchUsers('nonexistentuser12345')).rejects.toThrow('No users found for this search query.');
    });
  });

  describe('getUserRepos', () => {
    it('calls fetch with correct URL and returns sorted JSON', async () => {
      const mockRepos = [
        { id: 1, name: 'repo1', stargazers_count: 10 },
        { id: 2, name: 'repo2', stargazers_count: 50 },
        { id: 3, name: 'repo3', stargazers_count: 10 },
      ];
      const mockJson = vi.fn().mockResolvedValue(mockRepos);
      mockFetch.mockResolvedValue({
        ok: true,
        json: mockJson,
        headers: {
          get: vi.fn().mockReturnValue('60'),
        },
      } as unknown as Response);

      const result = await getUserRepos('asruldev');
      expect(mockFetch).toHaveBeenCalledWith(
        'https://api.github.com/users/asruldev/repos?sort=stars&per_page=20'
      );
      // Should be sorted by stars (descending) then by name
      expect(result[0].stargazers_count).toBe(50);
      expect(result[1].name).toBe('repo1');
      expect(result[2].name).toBe('repo3');
    });

    it('throws error if response is not ok', async () => {
      mockFetch.mockResolvedValue({
        ok: false,
        status: 500,
        statusText: 'Internal Server Error',
        headers: {
          get: vi.fn().mockReturnValue('60'),
        },
      } as unknown as Response);

      await expect(getUserRepos('fail')).rejects.toThrow('Failed to fetch repositories: Internal Server Error');
    });

    it('throws error for user not found', async () => {
      mockFetch.mockResolvedValue({
        ok: false,
        status: 404,
        statusText: 'Not Found',
        headers: {
          get: vi.fn().mockReturnValue('60'),
        },
      } as unknown as Response);

      await expect(getUserRepos('nonexistentuser')).rejects.toThrow("User 'nonexistentuser' not found.");
    });

    it('throws error for rate limit exceeded', async () => {
      mockFetch.mockResolvedValue({
        ok: false,
        status: 403,
        statusText: 'Forbidden',
        headers: {
          get: vi.fn().mockReturnValue('0'),
        },
      } as unknown as Response);

      await expect(getUserRepos('fail')).rejects.toThrow('GitHub API rate limit exceeded. Please try again later.');
    });
  });
});
