import React, {useState} from 'react'
import Note from './components/Note'

const App = (props) => {
  const {notes} = props
  const [note, setNote] = useState(notes)

  const noteList = notes.map(
    nota =>
      <Note key={nota.id} note={nota}/>
    )
  const addNote = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)
  }
  
  return (
    <div>
      <h1>Notes</h1>
        <ul>
          {noteList}
        </ul>
        <form onSubmit={addNote}>
          <input />
          <button type="submit">save</button>
        </form>
    </div>
  )
}

export default App
