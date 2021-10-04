import React, { useState } from 'react';

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas' }
  ]);
  const [ newName, setNewName ] = useState('');

  const addPerson = (event) => {
    // Prevent page reload
    event.preventDefault();
    // Create new person
    const personObject = {
      name: newName,
    };
    // Add person to persons list without mutating list
    setPersons(persons.concat(personObject));
    // Clear input field
    setNewName('');
  }

  const handleNameChange = (event) => {
    // Update field value when typing in field
    setNewName(event.target.value);
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name:
          <input
            value={newName}
            onChange={handleNameChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map(person =>
          <li>{person.name}</li>
        )}
      </ul>
    </div>
  )
}

export default App;