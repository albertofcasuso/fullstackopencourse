import React from 'react';

const App = (props) => {
  const anecdotes = props.store.getState()
  const store = props.store

  const vote = (id) => {
    store.dispatch({
      type:'VOTE',
      data:{id}
    })
  }

  const createAnecdote = (content) => {
    return {
      type: 'NEW_ANECDOTE',
      data: {content}
    }
  }

  const addAnecdote = (event) =>{
    event.preventDefault()
    const createdAnecdote = createAnecdote(event.target.anecdote.value)
    store.dispatch(createdAnecdote)
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
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