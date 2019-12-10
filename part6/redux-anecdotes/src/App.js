import React from 'react';
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'
import Filter from './components/Filter'

const App = (props) => {
  const store = props.store
  
  return (
    <div>
      
      <AnecdoteList store={store}/>
      
    </div>
  )
}
/*
  <Notification store={store}/>
  <Filter store={store}/>
  <AnecdoteForm store={store}/>
*/
export default App