import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)


  const setG = (plus) => () =>{
      setGood(plus)
  }

  const setN = (plus) => () =>{
      setNeutral(plus)
  }
  const setB = (plus) => () =>{
      setBad(plus)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={setG(good + 1)}>good</button>
      <button onClick={setN(neutral + 1)}>neutral</button>
      <button onClick={setB(bad + 1)}>bad</button>
        <h1>Statistics</h1>
        <p>good = {good}</p>
        <p>neutral = {neutral}</p>
        <p>bad  = {bad}</p>
        <p>average</p>
        <p>positive</p>
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
