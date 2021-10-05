import React from 'react';

const Countries = ({ countriesToShow }) => {

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

    // Create array of list elements for langauges
    const languages = [];

    for (const property in country.languages) {
      languages.push(<li key={property}>{country.languages[property]}</li>)
    }

    return (
      <div>
        <h1>{country.name.common}</h1>
        {console.log(country)}
        <div>
          <p>
            capital {country.capital[0]}
            <br />
            population {country.population}
          </p>
        </div>
        <h2>languages</h2>
        <ul>
          {languages}
        </ul>
        <img src={country.flags.png} alt={`flag of ${country.name.common}`} />
      </div>
    )
  } else {
    return (
      <div>
        {countriesToShow.map(country =>
          <div key={country.cca2}>{country.name.common}</div>
        )}
      </div>
    );
  }
};

export default Countries;