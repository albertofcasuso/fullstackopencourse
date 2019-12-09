import React from 'react'
import {createAnecdote} from '../reducers/anecdoteReducer'
import {setNotification,removeNotification} from '../reducers/notificationReducer'


const AnecdoteForm = (props) => {
    const store = props.store

    const addAnecdote = (event) =>{
        event.preventDefault()
        store.dispatch(createAnecdote(event.target.anecdote.value))
        store.dispatch(setNotification(`you added "${event.target.anecdote.value}"`))
        setTimeout(() => {store.dispatch(removeNotification())}, 3000)

      }

    return (
        <div>
        <h2>create new</h2>
            <form onSubmit={addAnecdote}>
                <div><input name='anecdote'/></div>
                <button>create</button>
            </form>
        </div>
    )
}

export default AnecdoteForm
