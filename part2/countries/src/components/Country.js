import React from 'react';

const Country = ({ country }) => {
  // Show basic data of the country, its flag and languages spoken
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
  );
}

export default Country;