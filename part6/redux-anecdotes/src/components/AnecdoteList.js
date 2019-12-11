import React from 'react'
import {connect} from 'react-redux'
import {voteAnecdote} from '../reducers/anecdoteReducer'
import {setNotification,removeNotification} from '../reducers/notificationReducer'

const AnecdoteList = (props) => {

    const vote = (anecdote) =>{
        props.voteAnecdote(anecdote)
        props.setNotification(`you voted "${anecdote.content}"`)
        setTimeout(() => {props.removeNotification()}, 3000)
      }

    return (
        <div>
        <h2>Anecdotes</h2>
            {props.filteredAnecdotes.map(anecdote =>
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
const filteredList = ({anecdotes,filter})=>{
  if(filter){
    return (anecdotes.filter(anecdote=>
      anecdote.content.toLowerCase().includes(filter.filter.toLowerCase())
    ))
  }else{return anecdotes}  
}
const orderListOf = ({anecdotes}) =>{
  return anecdotes.sort((a,b)=>{return a.votes<b.votes?1:-1})
}
const mapStateToProps = (state)=>{
  return {
    anecdotes:state.anecdotes,
    filter:state.filter,
    filteredAnecdotes:filteredList(state),
    orderedAnecdotes:orderListOf(state),
  }
}
const mapDispatchToProps = {
  voteAnecdote,
  setNotification,
  removeNotification,
}
const connectedAnecdotes = connect(mapStateToProps,mapDispatchToProps)(AnecdoteList)
export default connectedAnecdotes
