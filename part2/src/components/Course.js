import React from 'react'
import Header from './Header'

const Course =(props) =>{
  const {course} = props
  return(
    <div>
      <Header course={course}/>
    </div>
  )
}

export default Course
