import React, { useState } from 'react';

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]);
  const [ newName, setNewName ] = useState('');
  const [ newNumber, setNewNumber ] = useState('');
  const [ searchField, setSearchField ] = useState('');

  const addPerson = (event) => {
    // Prevent page reload
    event.preventDefault();
    // Prevent user from adding already existing names
    if (persons.some(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`);
      return;
    }
    // Create new person
    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    };
    // Add person to persons list without mutating list
    setPersons(persons.concat(personObject));
    // Clear input fields
    setNewName('');
    setNewNumber('');
  }

  const handleNameChange = (event) => {
    // Update field value when typing in field
    setNewName(event.target.value);
  }

  const handleNumberChange = (event) => {
    // Update field value when typing in field
    setNewNumber(event.target.value);
  }

  const handleSearchFieldChange = (event) => {
    // Update field value when typing in field
    setSearchField(event.target.value);
  }

  // If text present in search field,
  // Use text to filter names (case-insensitive)
  // Else if no text present, show all people
  const peopleToShow = (searchField.length > 0)
    ? persons.filter(person => person.name.toUpperCase().
      includes(searchField.toUpperCase()))
    : persons;

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with
        <input
          value={searchField}
          onChange={handleSearchFieldChange}
        />
      </div>
      <h2>Add a new person</h2>
      <form onSubmit={addPerson}>
        <div>
          name:
          <input
            value={newName}
            onChange={handleNameChange}
          />
        </div>
        <div>
          number:
          <input
            value={newNumber}
            onChange={handleNumberChange}
        />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {peopleToShow.map(person =>
          <li key={person.id}>{person.name} {person.number}</li>
        )}
      </ul>
    </div>
  )
}

export default App;