import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

const App = () => {
  const [ persons, setPersons ] = useState([]);
  const [ newName, setNewName ] = useState('');
  const [ newNumber, setNewNumber ] = useState('');
  const [ searchField, setSearchField ] = useState('');

  // Set initial state using data fetched from server using axios
  const hook = () => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data);
      });
  };

  // Complete fetching with an Effect hook
  useEffect(hook, []);

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
      // id: persons.length + 1,
    };

    // Add person to backend server
    axios
      .post('http://localhost:3001/persons', personObject)
      .then(response => {
        // Add person to persons list without mutating list
        setPersons(persons.concat(personObject));
        // Clear input fields
        setNewName('');
        setNewNumber('');
      });
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
    ? persons.filter(person => person.name.toUpperCase()
      .includes(searchField.toUpperCase()))
    : persons;

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter
        searchField={searchField}
        handleSearchFieldChange={handleSearchFieldChange}
      />
      
      <h3>Add a new person</h3>

      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />

      <h3>Numbers</h3>

      <Persons peopleToShow={peopleToShow} />
    </div>
  )
}

export default App;