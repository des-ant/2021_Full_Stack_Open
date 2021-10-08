import React, { useEffect, useState } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import personService from './services/persons';

const App = () => {
  const [ persons, setPersons ] = useState([]);
  const [ newName, setNewName ] = useState('');
  const [ newNumber, setNewNumber ] = useState('');
  const [ searchField, setSearchField ] = useState('');

  // Set initial state using data fetched from server using axios
  // Complete fetching with an Effect hook
  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons);
      });
  }, []);

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
    };

    // Add person to backend server
    personService
      .create(personObject)
      .then(returnedPerson => {
        // Add person to persons list without mutating list
        setPersons(persons.concat(returnedPerson));
        // Clear input fields
        setNewName('');
        setNewNumber('');
      });
  };

  const deletePerson = (id) => {
    const person = persons.find(p => p.id === id);
    const shouldDeletePerson = window.confirm(`Delete ${person.name} ?`);

    if (shouldDeletePerson) {
      personService
        .deletePerson(id)
        .then(returnedPerson => {
          // Remove person from state and update UI
          setPersons(persons.filter(p => p.id !== id));
        })
        .catch(error => {
          alert(
            `The person '${person.name}' was already deleted from server`
          );
          // Remove person from state and update UI
          setPersons(persons.filter(p => p.id !== id));
        })
    }
  };

  const handleNameChange = (event) => {
    // Update field value when typing in field
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    // Update field value when typing in field
    setNewNumber(event.target.value);
  };

  const handleSearchFieldChange = (event) => {
    // Update field value when typing in field
    setSearchField(event.target.value);
  };

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

      <div>
        {peopleToShow.map(person =>
          <Persons
            key={person.id}
            person={person}
            deletePerson={() => deletePerson(person.id)}
          />
        )}
      </div>
    </div>
  )
};

export default App;