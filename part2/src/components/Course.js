import React from 'react'
import Header from './Header'
import Content from './Content'

const Course =(props) =>{
  const {courses} = props

  const all = courses.map((value) =>{
    return(<div>
      <Header course= {value} key={value.id}/>
      <Content course= {value} key={value.id}/>
      </div>
  )})


  return all
}

export default Course
