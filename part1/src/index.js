import React from 'react';
import ReactDOM from 'react-dom';


const Header = (props) => {
    return(
        <h1>{props.course}</h1>
    )
}

const Part = (props) => {
    return (
        <p>
        {props.part} {props.exercises}
        </p>
    )
}

const Content = (props) => {
    const part1 = 'Fundamentals of React'
    const exercises1 = 10
    const part2 = 'Using props to pass data'
    const exercises2 = 7
    const part3 = 'State of a component'
    const exercises3 = 14

    return(
        <div>
          <Part part={part1} exercises={exercises1}/>
          <Part part={part2} exercises={exercises2}/>
          <Part part={part3} exercises={exercises3}/>
        </div>
    )
}

const Total = (props) => {
    return (
        <p>Number of exercises {props.total}</p>
    )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  return (
    <div>
      <Header course={course}/>
      <Content />
      <Total total={part1.exercises+part2.exercises+part3.exercises}/>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
