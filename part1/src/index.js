import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Statistics = (props) => {
    const good = props.good
    const neutral = props.neutral
    const bad = props.bad
    const total = props.total
    const average = props.average
    
    return(
        <div>
        <h1>Statistics</h1>
        <p>good = {good}</p>
        <p>neutral = {neutral}</p>
        <p>bad  = {bad}</p>
        <p>total = {total}</p>
        <p>average = {average/total}</p>
        <p>positive = {(good/total)*100}</p>
        </div>
    )
}

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)
  const [average, setAverage] = useState(0)


  const setG = () => () =>{
      setGood(good+1)
      setTotal(total+1)
      setAverage(average+1)
  }

  const setN = () => () =>{
      setNeutral(neutral+1)
      setTotal(total+1)

  }
  const setB = () => () =>{
      setBad(bad+1)
      setTotal(total+1)
      setAverage(average-1)

  }

  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={setG()}>good</button>
      <button onClick={setN()}>neutral</button>
      <button onClick={setB()}>bad</button>
      <Statistics good={good} neutral={neutral} bad={bad} total={total} average={average}/>
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
