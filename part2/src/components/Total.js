import React from 'react'


const Total = (props) => {

  const {parts} = props
  const exercises = parts.map((x) => x.exercises)
  const total = exercises.reduce((s, p) => s + p)

    return (
        <p>Total of exercises {total}</p>
    )
}

export default Total
