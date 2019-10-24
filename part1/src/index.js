import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Statistic = (props) =>{
    const text = props.text
    const stat = props.value

    return(
        <div>
            <p>{text} = {stat}</p>
        </div>
    )
}

const Button = (props) => {
    
}



const Statistics = (props) => {
    const good = props.good
    const neutral = props.neutral
    const bad = props.bad
    const total = props.total
    const average = props.average

    if (total === 0) {
    return (
      <div>
          <h1>Statistics</h1>
        <p>No votes yet</p>
      </div>
    )
  }

    return(
        <div>
        <h1>Statistics</h1>
            <Statistic text='Good= ' value={good}/>
            <Statistic text='Bad= ' value={bad}/>
            <Statistic text='Neutral= ' value={neutral}/>
            <Statistic text='Total= ' value={total}/>
            <Statistic text='Average=' value={average/total}/>
            <Statistic text='Positive %=' value={(good/total)*100}/>
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
