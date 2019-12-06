import React from 'react'
import {createAnecdote} from '../reducers/anecdoteReducer'

const AnecdoteForm = (props) => {
    const store = props.store

    const addAnecdote = (event) =>{
        event.preventDefault()
        store.dispatch(createAnecdote(event.target.anecdote.value))
      }

    return (
        <div>
            <form onSubmit={addAnecdote}>
                <div><input name='anecdote'/></div>
                <button>create</button>
            </form>
        </div>
    )
}

export default AnecdoteForm
