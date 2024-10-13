import React, { useState } from 'react';
import axios from 'axios';
import '../App.scss';
import { getHistory, removeFromHistory } from '../helper';
import { City } from '../types/weather';
import { FiSearch } from 'react-icons/fi';
import { AiOutlineDelete } from 'react-icons/ai';
const apiKey = process.env.REACT_APP_OPENWEATHERMAP_API_KEY;

function HistoryPage({ onSelectCity }: { onSelectCity: (city: City) => void }) {
  const [city, setCity] = useState<string>('');
  const [error, setError] = useState<string>('');

  const [history, setHistory] = useState<string[]>(getHistory());

  const getCityLatLong = async (cityName: string) => {
    try {
      const reponse = await axios.get(
        `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=${apiKey}`
      );

      const { data } = reponse;
      if (data && data.length > 0) {
        const city = data[0] as City;
        onSelectCity(city);
      } else {
        setError('Invalid country or city');
      }
    } catch (err) {
      setError('Invalid country or city');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (city) {
      getCityLatLong(city);
    }
  };

  return (
    <div className="history">
      <div className="formSearch">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Search country or city here..."
          />
          <button type="submit">Search</button>
        </form>
        {error && <p className="error">{error}</p>}
      </div>

      <div className="listHistory">
        <h2>Search History</h2>

        {history.length === 0 ? (
          <p>No search history</p>
        ) : (
          <ul>
            {history.map((city) => (
              <li key={city}>
                <span>{city}</span>
                <FiSearch
                  style={{ height: 34 }}
                  onClick={() => {
                    getCityLatLong(city);
                  }}
                />
                <AiOutlineDelete
                  style={{ height: 34 }}
                  onClick={() => {
                    removeFromHistory(city);
                    setHistory(getHistory());
                  }}
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default HistoryPage;
