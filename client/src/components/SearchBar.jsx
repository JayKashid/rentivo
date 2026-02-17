import React, { useState } from 'react';
import { Search, MapPin, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SearchBar = ({ 
  onSearch,
  placeholder = "Search by locality, project, or builder",
  variant = "dark"
}) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  const popularSearches = [
    "Koregaon Park",
    "Hinjewadi Phase 1", 
    "Wakad",
    "Baner",
    "Kharadi",
    "Viman Nagar",
  ];

  const performSearch = (query) => {
    if (!query.trim()) return;
    if (onSearch) {
      onSearch({ query: query.trim(), type: 'all' });
    } else {
      navigate(`/properties?search=${encodeURIComponent(query.trim())}`);
    }
  };

  const handleSearch = () => {
    performSearch(searchQuery);
    setShowSuggestions(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSearch();
  };

  const handlePopularSearch = (search) => {
    setSearchQuery(search);
    performSearch(search);
    setShowSuggestions(false);
  };

  // Improved classes with better contrast and icon visibility
  const inputClasses = variant === 'dark'
    ? "w-full pl-12 pr-28 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
    : "w-full pl-12 pr-28 py-3 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm";

  const buttonClasses = variant === 'dark'
    ? "absolute right-1.5 top-1/2 -translate-y-1/2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-4 py-2 rounded-lg font-medium flex items-center gap-1.5 text-sm transition-all hover:shadow text-white"
    : "absolute right-1.5 top-1/2 -translate-y-1/2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-4 py-2 rounded-lg font-medium flex items-center gap-1.5 text-sm transition-all hover:shadow text-white";

  return (
    <div className="relative">
      <div className="relative">
        {/* Search icon – now with higher z-index and better contrast */}
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 z-10 pointer-events-none">
          <Search className="w-4 h-4" />
        </div>
        
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setShowSuggestions(e.target.value.length > 0);
          }}
          onKeyDown={handleKeyDown}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          placeholder={placeholder}
          className={inputClasses}
        />
        
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-24 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white z-10"
          >
            <X className="w-4 h-4" />
          </button>
        )}
        
        <button
          onClick={handleSearch}
          className={buttonClasses}
        >
          <Search className="w-3.5 h-3.5" />
          Search
        </button>
      </div>

      {/* Suggestions Dropdown */}
      {showSuggestions && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-gray-900/95 backdrop-blur-lg border border-white/20 rounded-xl shadow-2xl z-50 overflow-hidden">
          {searchQuery.trim() && (
            <div className="p-3 border-b border-white/10">
              <div className="text-xs text-gray-400 mb-1">Search for</div>
              <button
                onClick={handleSearch}
                className="w-full text-left p-2 hover:bg-white/10 rounded-lg flex items-center gap-2"
              >
                <Search className="w-4 h-4 text-blue-400" />
                <span className="font-medium">"{searchQuery}"</span>
                <span className="ml-auto text-xs text-gray-400">Press Enter</span>
              </button>
            </div>
          )}

          <div className="p-3">
            <div className="flex items-center gap-2 text-xs text-gray-400 mb-2">
              <MapPin className="w-3 h-3" />
              Popular in Pune
            </div>
            <div className="flex flex-wrap gap-1.5">
              {popularSearches.map((search) => (
                <button
                  key={search}
                  onClick={() => handlePopularSearch(search)}
                  className="px-2.5 py-1 bg-white/5 hover:bg-white/10 rounded text-xs text-slate-300 transition-colors"
                >
                  {search}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;