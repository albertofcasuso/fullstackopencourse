import React, { useState, useEffect } from 'react'
import dataService from './services/dataService'
import Persons from './components/Persons'
import Search from './components/Search'
import Input from './components/Input'
import Notification from './components/Notification'
import './index.css'

const App = () => {

  const [ persons, setPersons] = useState([])

  const [ newName, setNewName ] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchName, setSearch] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

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
    const existeNombre = persons.some(persona => persona.name === newName)

    if(existeNombre){
      const per = persons.find(persona => persona.name === newName)

      const changedPersona = {...per,number:newNumber}

      const confirm = window.confirm(`${per.name} already exists, change number?`)
      if(confirm){
        dataService
        .updateData(per.id,changedPersona)
        .then(response=>{
          setPersons(persons.map(persona=>persona.name===newName?response.data:persona))
          setErrorMessage(`Has cambiado el numero de: ${per.name}`)
          setTimeout(() => {setErrorMessage(null)}, 3000)
        })
        .catch(error => {
          setErrorMessage(`No se puede cambiar el numero de ${per.name}`)
          console.log(error)
          setTimeout(() => {setErrorMessage(null)}, 3000)
        })
      }
      }else{
        dataService.postData(personObject).then(response => {
          setPersons(persons.concat(response.data))
          setErrorMessage(`Has añadido a: ${newName}`)
          setTimeout(() => {setErrorMessage(null)}, 3000)
        })
      }
    //si NO existe lo añade y muestra en pantalla
  }

  const handleSearch = (event) =>{
    setSearch(event.target.value)
  }

  const handleDelete = (id) => {
    const newPersons = persons.filter(persona => persona.id !== id?persona:null)
    const persona = persons.find(persona => persona.id === id)

    if(window.confirm(`Seriously delete ${persona.name}?`)){
    dataService.deleteData(id).then(setPersons(newPersons))
    }
    else return null
  }

  return (
    <div>
     <h2>Phonebook</h2>
     <Search value={searchName} onChange={handleSearch}/>

     <h2>Add new person:</h2>
     <Notification message={errorMessage}/>
     <Input onSubmit={addPerson} nameValue={newName} numberValue={newNumber} numberChange={handleNumber} nameChange={handleName}/>

     <h2>Numbers</h2>
     <Persons persons={persons} search={searchName} click={handleDelete}/>
    </div>
  )
}

export default App
