import React from 'react'


const Total = (props) => {
  const {parts} = props
    let a= 0
    parts.forEach(value => {
        a+=value.exercises
    })
    return (
        <p>Total of exercises {a}</p>
    )
}

export default Total
