import { WeatherData } from '../types/weather';

const Forecast = ({ item }: { item: WeatherData }) => {
  const formatHour = (date: Date): string => {
    return date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
  };
  const displayCelsius = (): string => {
    return `${(item.main.temp_min - 273.15).toFixed(1)}/${(item.main.temp_max - 273.15).toFixed(1)}°C`;
  };
  return (
    <div className="forecastList__item">
      <p className="forecastList__item__time">
        {formatHour(new Date(item.dt_txt))}{' '}
      </p>
      <div className="forecastList__item__temp">
        <img
          src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
          alt="weather icon"
        />
        <p>{displayCelsius()}</p>
      </div>

      <p className="forecastList__item__des">{item.weather[0].description}</p>
    </div>
  );
};

export default Forecast;
