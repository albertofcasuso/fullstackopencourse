import React from 'react'

const Person = (props) => {

  const {persons} = props
  const personList = persons.map(persona => <li key={persona.id}>{persona.name}: {persona.number}</li>)

  return(
    <div>
    <h2>Numbers</h2>
    <ul>{personList}</ul>
    </div>
  )
}

export default Person
