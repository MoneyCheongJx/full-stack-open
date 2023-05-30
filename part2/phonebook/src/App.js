import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Person'
import personService from './services/person'
import './index.css'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [personToShow, setPersonToShow] = useState('')
  const [message, setMessage] = useState(null)

  const handleNameOnChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberOnChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchOnChange = (event) => {
    setPersonToShow(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()

    if (persons.some(person => person.name === newName))
      if (window.confirm(`${newName} is already added to phonebook replace the old number with a new one?`)) {
        const person = persons.find(person => person.name === newName)
        const changedPerson = { ...person, number: newNumber }
        personService.update(changedPerson.id, changedPerson)
          .then(returnedPerson => {
            setPersons(persons.map((person => person.id !== changedPerson.id ? person : returnedPerson)))
            setMessage(`Number is changed for ${person.name} with number ${person.number}`)
            setTimeout(() => {
              setMessage(null)
            }, 5000)
          })
          .catch(error => {
            setMessage(`Information of ${person.name} has already been removed from the server!`)
            var cols = document.getElementsByClassName('message');
            for(let i = 0; i < cols.length; i++) {
              cols[i].style.color = 'red';
            }
            setTimeout(() => {
              setMessage(null)
            }, 5000)
          })
        return null
      }

    const personObject = {
      name: newName,
      number: newNumber
    }

    personService.create(personObject)
      .then(returnedData => {
        console.log('returned data', returnedData)
        setPersons(persons.concat(returnedData))
        setNewName('')
        setNewNumber('')
        setMessage(`Added ${returnedData.name} with number ${returnedData.number}`)
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })
      .catch(error => {
        setMessage(`Unable to add ${personObject.name}!`)
      }
      )
  }

  const deletePerson = (person) => {
    console.log(`person ${person}`)
    if (window.confirm(`Delete ${person.name}?`)) {
      personService.deletePerson(person)
        .then(response => console.log(response))
    }
    personService.getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
      .catch(error => console.log("error"))
  }

  const Notification = ({ message }) => {
    if (message == null) {
      return null
    }

    return (
      <div className='message'>
        {message}
      </div>
    )
  }

  useEffect(() => {
    personService.getAll().then(initialPersons => {
      setPersons(initialPersons)
    })
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter search={personToShow} handleSearchOnChange={handleSearchOnChange} />
      <PersonForm addPerson={addPerson} newName={newName} newNumber={newNumber} handleNameOnChange={handleNameOnChange} handleNumberOnChange={handleNumberOnChange} />
      <Persons personToShow={(personToShow === '') ? persons : persons.filter(person => {
        return (person.name === personToShow)
      })} deletePerson={deletePerson} />
    </div>
  )
}

export default App
