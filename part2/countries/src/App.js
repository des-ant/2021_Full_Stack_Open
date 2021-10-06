import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Filter from './components/Filter';
import Countries from './components/Countries';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [searchField, setSearchField] = useState('');
  const [countriesToShow, setCountriesToShow] = useState([]);

  // Set initial state using data fetched from API using axios
  const hook = () => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data);
      });
  };

  // Complete fetching with an Effect hook
  useEffect(hook, []);

  const handleSearchFieldChange = (event) => {
    // Update field value when typing in field
    setSearchField(event.target.value);

    // If text present in search field,
    // Use text to filter countries by common namee (case-insensitive)
    // Else if no text present, add all countries to countries array state
    const countriesFiltered = (searchField.length > 0)
      ? countries.filter(country => country.name.common.toUpperCase()
        .includes(searchField.toUpperCase()))
      : countries;

    // Update countriesToShow array state
    setCountriesToShow(countriesFiltered);
  }

  // Show country details when pressing on button
  const showCountryPage = (event, country) => {
    // Prevent page reload
    event.preventDefault();

    // Update countriesToShow array state
    setCountriesToShow([country]);
  };


  return (
    <div>
      <Filter
        searchField={searchField}
        handleSearchFieldChange={handleSearchFieldChange}
      />

      <Countries
        countriesToShow={countriesToShow}
        showCountryPage={showCountryPage}
      />
    </div>
  );
};

export default App;
