import React from 'react'
import {voteAnecdote} from '../reducers/anecdoteReducer'
import {setNotification,removeNotification} from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
    const store = props.store
    const anecdotes = store.getState().anecdotes

    const vote = (anecdote) =>{
        store.dispatch(voteAnecdote(anecdote.id))
        store.dispatch(setNotification(`you voted "${anecdote.content}"`))
        setTimeout(() => {store.dispatch(removeNotification())}, 3000)
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
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
        </div>
    )
}

export default AnecdoteList
