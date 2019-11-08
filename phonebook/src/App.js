import React, { useState } from 'react'
import Person from './components/Person'

const App = () => {

  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas',
      id:1
    }
  ])
  const [ newName, setNewName ] = useState('')

  const nameList = persons.map(persona => <Person key={persona.id} person={persona}/>)

  const handleChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      id: persons.length +1,
    }
    setPersons(persons.concat(personObject))
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleChange}/>
        </div>
        <div>
          <button type="submit">Add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
      {nameList}
      </ul>
    </div>
  )
}

export default App
