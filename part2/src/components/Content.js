import React from 'react'
import Part from './Part'

const Content =(props) =>{
  const {course} = props
  return(
    <div>
      <Part parts={course.parts}/>
    </div>
  )
}

export default Content
