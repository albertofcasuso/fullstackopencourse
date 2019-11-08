import React, { useState } from 'react'
import Person from './components/Person'

const App = () => {

  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas',
      id:1,
      number: '1234567890'
    }
  ])
  const [ newName, setNewName ] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const handleName = (event) => {
    setNewName(event.target.value)

  }

  const handleNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      id: persons.length +1,
      number: newNumber,
    }
    const existe = persons.some(persona => persona.name === newName)
    personObject.number ?
    existe ? alert(`${newName} is already added to phonebook`):setPersons(persons.concat(personObject)) : alert('no hay numero')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleName}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumber}/>
       </div>
        <div>
          <button type="submit">Add</button>
        </div>
      </form>

      <Person persons={persons}/>

    </div>
  )
}

export default App
