import React, { useState } from 'react';
import { X } from 'lucide-react';
import '../styles/SearchBar.css';

const SearchBar = ({ darkMode, onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isActive, setIsActive] = useState(false);

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  const handleClear = () => {
    setSearchTerm('');
    onSearch('');
  };

  return (
    <div className={`search-bar ${darkMode ? 'dark' : ''} ${isActive ? 'active' : ''}`}>
      <svg 
        className="search-icon" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor"
      >
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.35-4.35" />
      </svg>
      
      <input
        type="text"
        placeholder="Rechercher des chapitres, sujets..."
        value={searchTerm}
        onChange={handleChange}
        onFocus={() => setIsActive(true)}
        onBlur={() => setIsActive(false)}
      />
      
      {searchTerm && (
        <button 
          className="clear-btn"
          onClick={handleClear}
        >
          <X size={18} />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
