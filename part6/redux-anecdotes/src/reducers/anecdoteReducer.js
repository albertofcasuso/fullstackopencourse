/* eslint-disable default-case */
import anecdoteService from '../services/anecdotes'

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data:newAnecdote
    })
  }
}

export const voteAnecdote = (anecdote) => {
  return async dispatch =>{
    const response = await anecdoteService.voteAnecdote(anecdote)
    dispatch({
      type:'VOTE',
      data:response
    })
  }
}

export const initializeAnecdotes = () =>{
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type:'INIT_ANECDOTES',
      data: anecdotes,
    })
  }
}

const anecdoteReducer = (state = [], action) => {

  switch (action.type) {
    case 'VOTE':
      const votedAnecdote = action.data
      const stateToReturn = state.map(anecdote=>anecdote.id===votedAnecdote.id?votedAnecdote:anecdote)
      return stateToReturn
    case 'NEW_ANECDOTE':
      return [...state,action.data]
    case 'INIT_ANECDOTES':
      return action.data
  }
  return state
}

export default anecdoteReducer