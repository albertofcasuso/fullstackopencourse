/* eslint-disable default-case */

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}
export const createAnecdote = (content) => {
  return {
    type: 'NEW_ANECDOTE',
    data: {content}
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
      return [...state,asObject(action.data.content)]
    case 'INIT_ANECDOTES':
      return action.data
  }
  return state
}

export default anecdoteReducer