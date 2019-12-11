/* eslint-disable default-case */

export const createAnecdote = (content) => {
  return {
    type: 'NEW_ANECDOTE',
    data: content
  }
}

export const voteAnecdote = (id) => {
  return {
    type:'VOTE',
    data:{id}
  }
}

export const initializeAnecdotes = (anecdotes) =>{
  return{
    type:'INIT_ANECDOTES',
    data:anecdotes
  }
}

const anecdoteReducer = (state = [], action) => {

  switch (action.type) {
    case 'VOTE':
      const anecdoteToVote = state.find(anecdote=>anecdote.id===action.data.id?anecdote:null)
      const votedAnecdote = {...anecdoteToVote,votes:anecdoteToVote.votes+1}
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