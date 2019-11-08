import React, { useState } from 'react'
import Persons from './components/Persons'

const App = () => {

  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', id:1,number: '1234567890'},
    { name: 'Ada Lovelace',id:2, number: '39-44-5323523' },
    { name: 'Dan Abramov',id:3, number: '12-43-234345' },
    { name: 'Mary Poppendieck',id:4, number: '39-23-6423122' }
  ])
  const [ newName, setNewName ] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchName, setSearch] = useState('')



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

  const handleSearch = (event) =>{
    setSearch(event.target.value)
  }
  const namesToShow = searchName ? persons.filter(person => person.name.toLowerCase().includes(searchName)) : persons
  
  return (
    <div>
      <h2>Phonebook</h2>


      <p>Search by name: </p>
      <input value={searchName} onChange={handleSearch}/>


     <h2>Add new person:</h2>
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

      <Persons persons={namesToShow}/>

    </div>
  )
}

export default App
