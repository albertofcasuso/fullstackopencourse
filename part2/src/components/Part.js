import React from 'react'

const Part = (props) => {
  const {parts} = props
  const all = parts.map((value,i) => <p key={value.id}>{value.name} {value.exercises}</p>)
  return (
    <div>{all}</div>
  )
}

export default Part
