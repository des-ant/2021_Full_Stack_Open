import React from 'react';
import Country from './Country';

const Countries = ({ countriesToShow, showCountryPage }) => {
  // If there are too many (over 10) countries that match query,
  // then prompt user to make query more specific
  if (countriesToShow.length > 10) {
    return (
      <div>Too many matches, specify another filter</div>
    );
  } else if (countriesToShow.length === 1) {
    // When there is only one country matching the query,
    // Then show basic data of the country, its flag and languages spoken
    const country = countriesToShow[0];

    return (
      <Country country={country} />
    );
  } else {
    // Sort list of countries in alphabetic order of name
    // Copy array before sorting to prevent mutation
    const countriesToShowSorted = [...countriesToShow].sort(
      (a, b) => (a.name.common > b.name.common) ? 1 : -1
    );

    return (
      <div>
        {countriesToShowSorted.map(country =>
          <div key={country.cca2}>
            {country.name.common}
            <button onClick={(e) => showCountryPage(e, country)}>show</button>
          </div>
        )}
      </div>
    );
  }
};

export default Countries;