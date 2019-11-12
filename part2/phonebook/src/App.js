import React, { useState, useEffect } from 'react'
import axios from 'axios'
import dataService from './services/dataService'
import Persons from './components/Persons'
import Search from './components/Search'
import Input from './components/Input'

const App = () => {

  const [ persons, setPersons] = useState([])

  const [ newName, setNewName ] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchName, setSearch] = useState('')

  const fetchData = () => {
    dataService.fetchData()
    .then(notas => setPersons(notas))
  }

  useEffect(fetchData,[])

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
      number: newNumber,
    }
    const existe = persons.some(persona => persona.name === newName)
    personObject.number ?
    existe ?
    //si SI existe:
      alert(`${newName} is already added to phonebook`)
    //si NO existe lo añade y muestra en pantalla
      :dataService.postData(personObject).then(response => setPersons(persons.concat(response.data)))
    //si NO hay numero
      : alert('no hay numero')
  }

  const handleSearch = (event) =>{
    setSearch(event.target.value)
  }

  const handleDelete = (id) => {
    const newPersons = persons.filter(persona => {if(persona.id !== id){return persona}})
    const persona = persons.find(persona => persona.id === id)
    if(window.confirm(`Seriously delete ${persona.name}?`)){
    axios
    .delete(`http://localhost:3001/persons/${id}`)
    .then(setPersons(newPersons))
  }
  }

  return (
    <div>
     <h2>Phonebook</h2>
     <Search value={searchName} onChange={handleSearch}/>

     <h2>Add new person:</h2>
     <Input onSubmit={addPerson} nameValue={newName} numberValue={newNumber} numberChange={handleNumber} nameChange={handleName}/>

     <h2>Numbers</h2>
     <Persons persons={persons} search={searchName} click={handleDelete}/>
    </div>
  )
}

export default App
