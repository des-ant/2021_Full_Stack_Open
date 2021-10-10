import React, { useEffect, useState } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import personService from './services/persons';
import Notification from './components/Notification';

const App = () => {
  const [ persons, setPersons ] = useState([]);
  const [ newName, setNewName ] = useState('');
  const [ newNumber, setNewNumber ] = useState('');
  const [ searchField, setSearchField ] = useState('');
  const [ alertMessage, setAlertMessage ] = useState(null);
  const [ alertType, setAlertType ] = useState('');

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

    // Prevent user from adding empty values
    if (!newName || newName.length === 0 || !newNumber || newNumber.length === 0) {
      // Show error notification
      setAlertMessage("Please enter a name and number");
      setAlertType('error');
      setTimeout(() => {
        setAlertMessage(null)
      }, 5000);
      return;
    }

    const existingPerson = persons.find(person => person.name === newName);
    
    // If person is already in phonebook, update number
    if (existingPerson) {
      const shouldUpdateNumber = window.confirm(
        `${newName} is already added to phonebook, ` +
        `replace the the old number with a new one?`
      );
      
      if (shouldUpdateNumber) {
        const id = existingPerson.id;

        // Create new person object with new number and copy other existing data
        const updatedPerson = { ...existingPerson, number: newNumber };

        // Update person in backend server
        personService
          .update(id, updatedPerson)
          .then(returnedPerson => {
            // Update state to reflect updated person's information
            setPersons(persons.map(p => p.id !== id ? p : returnedPerson));
            // Clear input fields
            setNewName('');
            setNewNumber('');
            // Show success notification
            setAlertMessage(
              `Updated ${returnedPerson.name}`
            );
            setAlertType('success');
            setTimeout(() => {
              setAlertMessage(null)
            }, 5000);
          })
          .catch(error => {
            // Show error notification
            setAlertMessage(
              `Information of '${existingPerson.name}' has already been removed from server`
            );
            setAlertType('error');
            setTimeout(() => {
              setAlertMessage(null)
            }, 5000);
            // Remove person from state and update UI
            setPersons(persons.filter(p => p.id !== id));
            // Clear input fields
            setNewName('');
            setNewNumber('');
          })
      }

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
        // Show success notification
        setAlertMessage(
          `Added ${returnedPerson.name}`
        );
        setAlertType('success');
        setTimeout(() => {
          setAlertMessage(null)
        }, 5000);
      });
  };

  const deletePerson = (id) => {
    const person = persons.find(p => p.id === id);
    const shouldDeletePerson = window.confirm(`Delete ${person.name} ?`);

    if (shouldDeletePerson) {
      // Delete person from backend server
      personService
        .deletePerson(id)
        .then(returnedPerson => {
          // Remove person from state and update UI
          setPersons(persons.filter(p => p.id !== id));
        })
        .catch(error => {
          // Show error notification
          setAlertMessage(
            `The person '${person.name}' was already deleted from server`
          );
          setAlertType('error');
          setTimeout(() => {
            setAlertMessage(null)
          }, 5000);
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

      <Notification
        message={alertMessage}
        type={alertType}
      />

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