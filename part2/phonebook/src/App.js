import { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Person'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')

  const personToShow = (newSearch === '') ? persons : persons.filter(person => {
    return (person.name === newSearch)
  }
  )

  const handleNameOnChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberOnChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchOnChange = (event) => {
    console.log(event.target.value)
    setNewSearch(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
    
    if (persons.some(person => person.name === newName))
      return alert(`${newName} is already added to phonebook`)

    const personObject = {
      name: newName,
      number: newNumber
    }

    setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter search={newSearch} handleSearchOnChange={handleSearchOnChange} />
      <PersonForm addPerson={addPerson} newName={newName} newNumber={newNumber} handleNameOnChange={handleNameOnChange} handleNumberOnChange={handleNumberOnChange}/>
      <Persons personToShow={personToShow}/>
    </div>
  )
}

export default App
