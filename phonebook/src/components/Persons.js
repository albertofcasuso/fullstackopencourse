import React from 'react'

const Persons = (props) => {

  const {persons} = props
  const {search} = props

  const namesToShow = search ? persons.filter(person => person.name.toLowerCase().includes(search)) : persons

  const personList = namesToShow.map(persona => <li key={persona.id}>{persona.name}: {persona.number}</li>)



  return(
    <div>
    <ul>{personList}</ul>
    </div>
  )
}

export default Persons
