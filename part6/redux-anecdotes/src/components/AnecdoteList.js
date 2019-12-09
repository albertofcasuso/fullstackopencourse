import React from 'react'
import {voteAnecdote} from '../reducers/anecdoteReducer'

const AnecdoteList = (props) => {
    const store = props.store
    const anecdotes = store.getState().anecdotes

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
        </div>
    )
}

export default AnecdoteList
