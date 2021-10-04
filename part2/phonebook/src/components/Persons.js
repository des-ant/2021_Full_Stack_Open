import React from 'react';

const Persons = ({ peopleToShow }) => {
  return (
    <div>
      <ul>
        {peopleToShow.map(person =>
          <li key={person.id}>{person.name} {person.number}</li>
        )}
      </ul>
    </div>
  )
};

export default Persons;