import React, { useState, useRef, useEffect } from 'react';

interface Props {
  onSearch: (query: string) => void;
}

const SearchUser: React.FC<Props> = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    setIsSearching(true);
    await onSearch(query);
    setIsSearching(false);
  };

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === '/' && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        inputRef.current?.focus();
      }

      if (e.key.toLowerCase() === 'k' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  return (
    <form onSubmit={handleSubmit} className="search-form">
      <input
        ref={inputRef}
        type="text"
        placeholder="Search GitHub users (e.g., 'john', 'react', 'microsoft')..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="search-input"
        disabled={isSearching}
      />
      <button 
        type="submit" 
        className="search-button"
        disabled={isSearching || !query.trim()}
      >
        {isSearching ? (
          <>
            <div className="spinner" style={{ width: '16px', height: '16px', margin: 0 }}></div>
            Searching...
          </>
        ) : (
          <>
            🔍
            Search
          </>
        )}
      </button>
    </form>
  );
};

export default SearchUser;
