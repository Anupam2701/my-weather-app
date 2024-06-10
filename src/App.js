import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [background, setBackground] = useState('');
  const [windSpeed, setWindSpeed] = useState(null);
  const [sunrise, setSunrise] = useState(null);
  const [sunset, setSunset] = useState(null);
  const [airQuality, setAirQuality] = useState(null);
  const [forecast, setForecast] = useState(null);

  const apiKey = 'f0e599ecc7b78c781229b2e44b740495';

  const weatherBackgrounds = {
    Clear: 'clear.jpg',
    Clouds: 'clouds.jpg',
    Rain: 'rain.jpg',
    Snow: 'snow.jpg',
    Thunderstorm: 'thunderstorm.jpg',
    Drizzle: 'drizzle.jpg',
    Mist: 'mist.jpg',
    Haze: 'haze.jpg',
    Fog: 'fog.jpg',
    Smoke: 'smoke.jpg',
    Haze: 'haze.jpg',
    Fog: 'fog.jpg',
    Smoke: 'smoke.jpg',
    Sunny: 'sunny.jpg',
    PartlyCloudy: 'PartlyCloudy.jpg'
  };

  const getWeather = async () => {
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
      setWeatherData(response.data);
      const weatherCondition = response.data.weather[0].main;
      setBackground(weatherBackgrounds[weatherCondition] || 'default.jpg');

      const windResponse = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
      setWindSpeed(windResponse.data.wind.speed);

      const sunResponse = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
      setSunrise(sunResponse.data.sys.sunrise);
      setSunset(sunResponse.data.sys.sunset);

      // Fetch air quality
      // Make API request for air quality data and setAirQuality with the response

      // Fetch weather forecast
      // Make API request for weather forecast data and setForecast with the response
    } catch (error) {
      console.error("Error fetching the weather data", error);
    }
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp * 1000);
    const hours = date.getHours();
    const minutes = "0" + date.getMinutes();
    return `${hours}:${minutes.substr(-2)}`;
  };

  return (
    <div className="app" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/images/${background})` }}>
      <header className="app-header">
        <h1>My-Weather-App</h1>
        <div className="input-container">
          <input
            type="text"
            placeholder="Enter city name"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button onClick={getWeather}>Get Weather</button>
        </div>
      </header>
      {weatherData && (
        <div className="weather-container">
          <h1>{weatherData.name}, {weatherData.sys.country}</h1>
          <p>{new Date().toLocaleDateString()}</p>
          <h2>{weatherData.main.temp}°C</h2>
          <p>{weatherData.weather[0].description}</p>
          <div className="additional-info">
            <p>High: {weatherData.main.temp_max}°C</p>
            <p>Low: {weatherData.main.temp_min}°C</p>
            <p>Wind Speed: {windSpeed} m/s</p>
            <p>Sunrise: {formatTime(sunrise)}</p>
            <p>Sunset: {formatTime(sunset)}</p>
            {/* Add more play cards for air quality and weather forecast */}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

