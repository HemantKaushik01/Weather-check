import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import './App.css';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchHistory, setSearchHistory] = useState([]);
  const [popularCities, setPopularCities] = useState([]);

  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        const res = await fetch('http://localhost:5000/weather/suggestions');
        const data = await res.json();
        setPopularCities(data.suggestions);
      } catch (err) {
        console.error('Error fetching popular cities:', err);
      }
    };
    fetchSuggestions();
  }, []);

  const fetchWeather = async (city) => {
    if (!city) return setError('Please enter a city');
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`http://localhost:5000/weather?city=${city}`);
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setWeatherData(data);
      setSearchHistory((prev) => [city, ...prev.filter((c) => c !== city)].slice(0, 5));
    } catch (err) {
      setError(err.message);
      setWeatherData(null);
    }
    setLoading(false);
  };

  const allSuggestions = [...new Set([...searchHistory, ...popularCities])];

  return (
    <div className="app-container">
      <h1> City 🌦 Mood</h1>
      <SearchBar onSearch={fetchWeather} suggestions={allSuggestions} />
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      {weatherData && <WeatherCard data={weatherData} />}
    </div>
  );
}

export default App;
