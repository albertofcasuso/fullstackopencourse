import React from 'react'
import {connect} from 'react-redux'
import {createAnecdote} from '../reducers/anecdoteReducer'
import {setNotification,removeNotification} from '../reducers/notificationReducer'


const AnecdoteForm = (props) => {

    const addAnecdote = (event) =>{
        event.preventDefault()
        props.createAnecdote(event.target.anecdote.value)
        props.setNotification(`you added "${event.target.anecdote.value}"`)
        setTimeout(() => {props.removeNotification()}, 3000)

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
const mapStateToProps = (state)=>{
    return {
      anecdotes:state.anecdotes,
      filter:state.filter,
    }
  }
const mapDispatchToProps = {
    createAnecdote,
    setNotification,
    removeNotification,
}
const connectedAnecdoteForm = connect(mapStateToProps,mapDispatchToProps)(AnecdoteForm)
export default connectedAnecdoteForm
