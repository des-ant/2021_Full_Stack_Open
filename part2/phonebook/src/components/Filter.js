import React from 'react';

const Filter = ({ searchField, handleSearchFieldChange }) => {
  return (
    <div>
      filter shown with
      <input
        value={searchField}
        onChange={handleSearchFieldChange}
      />
    </div>
  )
};

export default Filter