import { WeatherCurrentData } from '../types/weather';
import { capitalizeWords, formatFullDate } from '../helper';

const WeatherCard = ({ weatherData }: { weatherData: WeatherCurrentData }) => {
  const temperatureCelsius = (weatherData.main.temp - 273.15).toFixed(1);
  const windSpeed = weatherData.wind.speed;
  const visibilityKm = (weatherData.visibility / 1000).toFixed(1);
  const humidity = weatherData.main.humidity;
  const description = weatherData.weather[0].description;

  return (
    <div className="card">
      <div className="today">
        <h1>{formatFullDate(new Date())}</h1>
      </div>
      <div className="body">
        <img
          src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
          alt="weather icon"
        />
        <div>
          <h2>{temperatureCelsius}°C</h2>
          <p>{capitalizeWords(description)}</p>
        </div>
      </div>
      <div className="details">
        <div>
          <label>Humidity</label>
          <p>{humidity} %</p>
        </div>
        <div>
          <label>Winds</label>
          <p>{windSpeed} m/s</p>
        </div>
        <div>
          <label>Visibility</label>
          <p>{visibilityKm} km</p>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
