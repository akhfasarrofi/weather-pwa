import React, { useEffect, useState } from 'react';

import { searchWeather, weatherPosition } from './weather';
import './App.css';

const App = () => {
  const [query, setQuery] = useState('');
  const [dataWeather, setDataWeather] = useState({});
  const [marker, setMarker] = useState({
    lat: '0',
    long: '0',
  });
  const [permission, setPermission] = useState(false);

  const search = async (e) => {
    if (e.key === 'Enter') {
      const response = await searchWeather(query);

      setDataWeather(response);
      setQuery('');
    }
  };

  const permissionLocation = async () => {
    const allowLocation = await navigator.permissions.query({
      name: 'geolocation',
    });

    if (allowLocation.state === 'granted') {
      setPermission(true);
    }
  };

  const getDataWeatherByPosition = async () => {
    const response = await weatherPosition(marker);
    setDataWeather(response);
  };

  useEffect(() => {
    if (permission) {
      navigator.geolocation.getCurrentPosition((position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        setMarker({
          lat: latitude.toString(),
          long: longitude.toString(),
        });
      });
      getDataWeatherByPosition();
    }

    permissionLocation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [permission, query]);

  return (
    <div className="main-container">
      <input
        type="text"
        className="search"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyPress={search}
      />
      {dataWeather.main && (
        <div className="city">
          <h2 className="city-name">
            <span>{dataWeather.name}</span>
            <sup>{dataWeather.sys.country}</sup>
          </h2>
          <div className="city-temp">
            {Math.round(dataWeather.main.temp)}
            <sup>&deg;C</sup>
          </div>
          <div className="info">
            <img
              className="city-icon"
              src={`https://openweathermap.org/img/wn/${dataWeather.weather[0].icon}@2x.png`}
              alt={dataWeather.weather[0].description}
            />
            <p>{dataWeather.weather[0].description}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
