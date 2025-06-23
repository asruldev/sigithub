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
      const mockJson = vi.fn().mockResolvedValue({ items: [] });
      mockFetch.mockResolvedValue({
        ok: true,
        json: mockJson,
      } as unknown as Response);

      const result = await searchUsers('asruldev');
      expect(mockFetch).toHaveBeenCalledWith(
        'https://api.github.com/search/users?q=asruldev&per_page=5'
      );
      expect(result).toEqual({ items: [] });
    });

    it('throws error if response is not ok', async () => {
      mockFetch.mockResolvedValue({
        ok: false,
      } as unknown as Response);

      await expect(searchUsers('fail')).rejects.toThrow('Failed to fetch users');
    });
  });

  describe('getUserRepos', () => {
    it('calls fetch with correct URL and returns JSON', async () => {
      const mockJson = vi.fn().mockResolvedValue([{ id: 1, name: 'repo' }]);
      mockFetch.mockResolvedValue({
        ok: true,
        json: mockJson,
      } as unknown as Response);

      const result = await getUserRepos('asruldev');
      expect(mockFetch).toHaveBeenCalledWith(
        'https://api.github.com/users/asruldev/repos'
      );
      expect(result).toEqual([{ id: 1, name: 'repo' }]);
    });

    it('throws error if response is not ok', async () => {
      mockFetch.mockResolvedValue({
        ok: false,
      } as unknown as Response);

      await expect(getUserRepos('fail')).rejects.toThrow('Failed to fetch repositories');
    });
  });
});
