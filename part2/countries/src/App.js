import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Filter from './components/Filter';
import Countries from './components/Countries';

const App = () => {
  const [ countries, setCountries ] = useState([]);
  const [ searchField, setSearchField ] = useState('');

  // Set initial state using data fetched from API using axios
  const hook = () => {
    console.log('effect');
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        console.log('promise fulfilled');
        setCountries(response.data);
      });
  };

  // Complete fetching with an Effect hook
  useEffect(hook, []);
  console.log('render', countries.length, 'countries');

  const handleSearchFieldChange = (event) => {
    // Update field value when typing in field
    setSearchField(event.target.value);
  }

  // If text present in search field,
  // Use text to filter countries by common namee (case-insensitive)
  // Else if no text present, add all countries to countries array state
  const countriesToShow = (searchField.length > 0)
    ? countries.filter(country => country.name.common.toUpperCase()
      .includes(searchField.toUpperCase()))
    : countries;

  return (
    <div>
      <Filter
        searchField={searchField}
        handleSearchFieldChange={handleSearchFieldChange}
      />

      <Countries countriesToShow={countriesToShow} />
    </div>
  );
};

export default App;
