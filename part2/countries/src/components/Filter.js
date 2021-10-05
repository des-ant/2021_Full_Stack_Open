import React from 'react';

const Filter = ({ searchField, handleSearchFieldChange }) => {
  return (
    <div>
      find countries
      <input
        value={searchField}
        onChange={handleSearchFieldChange}
      />
    </div>
  );
};

export default Filter;