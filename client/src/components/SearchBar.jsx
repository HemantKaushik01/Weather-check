import React, { useState } from 'react';

function SearchBar({ onSearch, suggestions = [] }) {
  const [city, setCity] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!city.trim()) return;
    onSearch(city);
    setCity('');
  };

  return (
    <div className="search-bar">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter your city..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          list="city-suggestions"
        />
        <datalist id="city-suggestions">
          {suggestions.map((city, index) => (
            <option key={index} value={city} />
          ))}
        </datalist>
        <button type="submit">Search</button>
      </form>
    </div>
  );
}

export default SearchBar;