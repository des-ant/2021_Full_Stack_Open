import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Country = ({ country }) => {
  const [weather, setWeather] = useState({});

  // Weather API
  const api_key = process.env.REACT_APP_API_KEY;

  // Set initial state using data fetched from API using axios
  const hook = () => {
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital[0]},${country.cca2}&appid=${api_key}&units=metric`)
      .then(response => {
        setWeather(response.data);
      });
  };

  // Complete fetching with an Effect hook
  useEffect(hook, []);

  // Show basic data of the country, its flag and languages spoken
  // Create array of list elements for langauges
  const languages = [];

  for (const property in country.languages) {
    languages.push(<li key={property}>{country.languages[property]}</li>)
  }

  // Wait for API response before rendering
  let weatherUI;
  if (Object.keys(weather).length === 0) {
    weatherUI = <div>Loading weather...</div>;
  } else {
    weatherUI = (
      <div>
        <p><b>description: </b>{weather.weather[0].description}</p>
        <img
          src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
          alt={`Icon graphic of ${weather.weather[0].description}`}
        />
        <p><b>temperature: </b>{weather.main.temp} Celsius</p>
        <p><b>wind: </b>{weather.wind.speed} m/s {weather.wind.deg} deg</p>
      </div>
    );
  }

  return (
    <div>
      <h1>{country.name.common}</h1>
      <div>
        <p>
          capital {country.capital[0]}
          <br />
          population {country.population}
        </p>
      </div>

      <h2>Spoken languages</h2>
      <ul>
        {languages}
      </ul>
      <img src={country.flags.png} alt={`flag of ${country.name.common}`} />

      <h2>Weather in {country.capital[0]}</h2>
      {weatherUI}
    </div>
  );
}

export default Country;