import { useEffect, useState } from 'react';
import axios from 'axios';
import '../App.scss';
import Forecast from '../components/Forecast';
import WeatherCard from '../components/WeatherCard';
import { groupByDay, formatDate, localStorageKey } from '../helper';
import {
  WeatherCityData,
  City,
  WeatherResponse,
  WeatherCurrentData,
} from '../types/weather';

const apiKey = process.env.REACT_APP_OPENWEATHERMAP_API_KEY;

function HomePage({ cityname }: { cityname: string }) {
  const [weatherData, setWeatherData] = useState<WeatherCityData | null>(null);

  const getCityLatLong = async (cityName: string) => {
    try {
      const reponse = await axios.get(
        `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=${apiKey}`
      );

      const { data } = reponse;
      if (data && data.length > 0) {
        const city = data[0] as City;
        const result = await getCurrentAndForecasts({
          lat: city.lat,
          lon: city.lon,
        });

        if (result) {
          setWeatherData(result);
        }

        const key = `${city.name}, ${city.country}`;
        localStorage.setItem(key, JSON.stringify({ ...result, city }));
        localStorage.setItem(localStorageKey, key);
      }
    } catch (err) {
      console.log(' ~ getListCity ~ err:', err);
    }
    return [];
  };

  const getCurrentAndForecasts = async ({
    lat,
    lon,
  }: {
    lat: number;
    lon: number;
  }) => {
    try {
      const reponseForecasts = await axios.get<WeatherResponse>(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`
      );

      const currentData = await axios.get<WeatherCurrentData>(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`
      );
      const payloadData = {
        current: currentData.data,
        forecast: reponseForecasts.data,
        groupByDay: groupByDay(reponseForecasts.data.list),
      };

      return payloadData;
    } catch (err) {
      console.log('🚀 ~ getLigetCurrentAndForecaststCity ~ err:', err);
    }
    return undefined;
  };

  useEffect(() => {
    if (cityname && cityname !== '') {
      getCityLatLong(cityname);
    }
  }, [cityname]);

  return (
    <>
      <div className="weatherCity">
        {weatherData ? (
          <>
            <WeatherCard weatherData={weatherData.current} />

            <div className="forecastList">
              <h2>5day Forecast (3 hours)</h2>
              <div className="forecastList__data">
                {Object.keys(weatherData.groupByDay).map((date) => (
                  <div className="group" key={date}>
                    <h3>{formatDate(date)}</h3>
                    {weatherData.groupByDay[date].map((item) => (
                      <Forecast item={item} key={item.dt} />
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : null}
      </div>
    </>
  );
}

export default HomePage;
