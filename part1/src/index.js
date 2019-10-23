import React from 'react';
import ReactDOM from 'react-dom';


const Header = (props) => {
    return(
        <h1>{props.course.name}</h1>
    )
}

const Part = (props) => {
    const all = props.parts.map(value => <p>{value.name} {value.exercises}</p>)
    return (
        all
    )
}

const Content = (props) => {
    return(
        <div>
          <Part parts={props.course.parts}/>
        </div>
    )
}

const Total = (props) => {
    let a= 0
    props.course.parts.forEach(value => {
        a+=value.exercises
    })
    return (
        <p>Number of exercises {a}</p>
    )
}

const App = () => {
    const course = {
      name: 'Half Stack application development',
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10
        },
        {
          name: 'Using props to pass data',
          exercises: 7
        },
        {
          name: 'State of a component',
          exercises: 14
        }
      ]
    }
  return (
    <div>
      <Header course={course}/>
      <Content course={course}/>
      <Total course={course}/>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
