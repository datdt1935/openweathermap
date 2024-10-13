import React from 'react';

interface WeatherProps {
  weather: {
    name: string;
    weather: { icon: string; description: string }[];
    main: { temp: number; humidity: number };
    wind: { speed: number; deg: number };
    visibility: number;
  };
}

const Weather: React.FC<WeatherProps> = ({ weather }) => {
  const { name, weather: weatherDetails, main, wind, visibility } = weather;

  return (
    <div>
      <h2>Current Weather in {name}</h2>
      <p>Date: {new Date().toLocaleDateString()}</p>
      <img
        src={`http://openweathermap.org/img/wn/${weatherDetails[0].icon}.png`}
        alt="Weather icon"
      />
      <p>{weatherDetails[0].description}</p>
      <p>Temperature: {main.temp}°C</p>
      <p>Humidity: {main.humidity}%</p>
      <p>
        Wind Speed: {wind.speed} m/s, Direction: {wind.deg}°
      </p>
      <p>Visibility: {visibility / 1000} km</p>
    </div>
  );
};

export default Weather;
