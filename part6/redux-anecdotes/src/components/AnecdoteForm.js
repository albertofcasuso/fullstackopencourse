import React from 'react'
import {connect} from 'react-redux'
import {createAnecdote} from '../reducers/anecdoteReducer'
import {setNotification,removeNotification} from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = (props) => {

    const addAnecdote = async (event) =>{
        event.preventDefault()
        const content = event.target.anecdote.value
        const newAnecdote = await anecdoteService.createNew(content)
        props.createAnecdote(newAnecdote)
        props.setNotification(`you added "${newAnecdote.content}"`)
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
