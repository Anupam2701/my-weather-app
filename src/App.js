import React, { useState } from 'react';
import styled from 'styled-components';
import './App.css';
import ThreeBackground from './ThreeBackground';

const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: ${({ weather }) =>
    weather === 'Clear'
      ? 'linear-gradient(to right, #00c6ff, #0072ff)'
      : weather === 'Clouds'
      ? 'linear-gradient(to right, #bdc3c7, #2c3e50)'
      : weather === 'Rain'
      ? 'linear-gradient(to right, #00c6ff, #0072ff)'
      : 'linear-gradient(to right, #e74c3c, #e67e22)'};
`;

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [airQuality, setAirQuality] = useState(null);

  const fetchWeather = async () => {
    if (!city) return;

    const apiKey = 'f0e599ecc7b78c781229b2e44b740495'; // Replace with your actual API key
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;
    const airQualityUrl = `https://api.openweathermap.org/data/2.5/air_pollution?q=${city}&appid=${apiKey}`;

    try {
      const weatherResponse = await fetch(weatherUrl);
      if (!weatherResponse.ok) {
        const errorData = await weatherResponse.json();
        throw new Error(errorData.message || 'City not found');
      }
      const weatherData = await weatherResponse.json();
      setWeather(weatherData);

      const forecastResponse = await fetch(forecastUrl);
      const forecastData = await forecastResponse.json();
      setForecast(forecastData);

      const airQualityResponse = await fetch(airQualityUrl);
      const airQualityData = await airQualityResponse.json();
      setAirQuality(airQualityData);
    } catch (error) {
      console.error('Error fetching data:', error);
      setWeather({ error: error.message });
    }
  };

  const getWeatherDescription = () => {
    if (!weather || !weather.weather || !weather.weather[0]) {
      return null;
    }
    return weather.weather[0].description;
  };

  return (
    <AppWrapper weather={weather && weather.weather && weather.weather[0] ? weather.weather[0].main : ''}>
      <ThreeBackground weather={weather && weather.weather && weather.weather[0] ? weather.weather[0].main : ''} />
      <h1>Weather App</h1>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city"
      />
      <button onClick={fetchWeather}>Get Weather</button>
      {weather && weather.main && (
        <div className="weather-info">
          <h2>{weather.name}</h2>
          <p>{getWeatherDescription()}</p>
          <p>{Math.round(weather.main.temp - 273.15)}°C</p>
          <p>Humidity: {weather.main.humidity}%</p>
        </div>
      )}
      {forecast && (
        <div className="forecast-info">
          <h2>5-Day Forecast</h2>
          {forecast.list.slice(0, 5).map((item, index) => (
            <div key={index}>
              <p>{new Date(item.dt * 1000).toLocaleDateString()}</p>
              <p>{item.weather && item.weather[0] && item.weather[0].description}</p>
              <p>{Math.round(item.main.temp - 273.15)}°C</p>
            </div>
          ))}
        </div>
      )}
      {airQuality && airQuality.list && airQuality.list[0] && (
        <div className="air-quality-info">
          <h2>Air Quality</h2>
          <p>PM2.5: {airQuality.list[0].components.pm2_5}</p>
          <p>PM10: {airQuality.list[0].components.pm10}</p>
        </div>
      )}
      {weather && weather.error && (
        <div className="error">
          <p>{weather.error}</p>
        </div>
      )}
    </AppWrapper>
  );
}

export default App;
