import { useEffect, useState } from 'react';
import './App.scss';
import { City } from './types/weather';
import { addToHistory, localStorageKey } from './helper';
import HomePage from './pages/homepage';
import { FiSearch } from 'react-icons/fi';
import { SlLocationPin } from 'react-icons/sl';
import HistoryPage from './pages/history';

function App() {
  const [showHistory, setShowHistory] = useState<boolean>(false);
  const [city, setCity] = useState<any>('');

  useEffect(() => {
    // Retrieve data from localStorage
    const storedData = localStorage.getItem(localStorageKey);

    // Parse the data if it exists
    if (storedData) {
      try {
        setCity(storedData);
      } catch (error) {
        console.error('Error parsing localStorage data:', error);
      }
    } else {
      setCity('Singapore, SG');
    }
  }, []);

  if (city === '') {
    return null;
  }

  return (
    <div className="App">
      <div className="barSearch">
        <div className="info">
          <SlLocationPin style={{ height: 34, cursor: 'default' }} />{' '}
          <span>{city}</span>
          <FiSearch
            style={{ height: 34 }}
            onClick={() => {
              setShowHistory(!showHistory);
            }}
          />
        </div>
      </div>
      {showHistory ? (
        <HistoryPage
          onSelectCity={(payload: City) => {
            const stringSearch = `${payload.name}, ${payload.country}`;
            setCity(stringSearch);
            addToHistory(stringSearch);
            setShowHistory(false);
          }}
        />
      ) : (
        <HomePage cityname={city} />
      )}
    </div>
  );
}

export default App;
