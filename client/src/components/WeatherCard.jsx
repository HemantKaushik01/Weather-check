import React from 'react';

function WeatherCard({ data }) {
  return (
    <>
    <div className="weather-card">
      <h2>{data.city}</h2>
      <img
        src={`https://openweathermap.org/img/wn/${data.icon}@2x.png`}
        alt="weather icon"
      />
      <p><strong>Temperature:</strong> {data.temperature}°C</p>
      <p><strong>Humidity:</strong> {data.humidity}%</p>
      <p><strong>Condition:</strong> {data.weather}</p>
      <p><strong>Wind Speed:</strong> {data.windSpeed} m/s</p>

    </div>
    <div>
        {data.forecast && (
        <div className="forecast">
          <h3>5-Day Forecast</h3>
          <div className="forecast-horizontal">
            {data.forecast.map((day, idx) => (
              <div key={idx} className="forecast-item">
                <p>{new Date(day.date).toLocaleDateString()}</p>
                <img
                  src={`https://openweathermap.org/img/wn/${day.icon}@2x.png`}
                  alt="icon"
                />
                <p>{day.temperature}°C</p>
                <p>{day.weather}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
    </>
  );
}

export default WeatherCard;
