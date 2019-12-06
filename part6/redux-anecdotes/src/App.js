import React from 'react';
import {createAnecdote,voteAnecdote} from './reducers/anecdoteReducer'

const App = (props) => {
  const anecdotes = props.store.getState()
  const store = props.store

  const addAnecdote = (event) =>{
    event.preventDefault()
    store.dispatch(createAnecdote(event.target.anecdote.value))
  }

  const vote = (id) =>{
    store.dispatch(voteAnecdote(id))
  }

  const orderListOf = (list) =>{
    return list.sort((a,b)=>{return a.votes<b.votes?1:-1})
  }
  
  return (
    <div>
      <h2>Anecdotes</h2>
      {orderListOf(anecdotes).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name='anecdote'/></div>
        <button>create</button>
      </form>
    </div>
  )
}

export default App