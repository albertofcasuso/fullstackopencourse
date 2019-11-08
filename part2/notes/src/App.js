import React, {useState} from 'react'
import Note from './components/Note'

const App = (props) => {
  const {notes} = props
  const [note, setNote] = useState(notes)
  const [newNote, setNewNote] = useState('a new note...')
  const [showAll, setShowAll] = useState(true)

  const notesToShow = showAll ? notes : notes.filter(note => note.important)

  const noteList = notesToShow.map(
    nota =>
      <Note key={nota.id} note={nota}/>
    )

  const handleChange = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value)
  }

  const addNote = (event) => {
    event.preventDefault()
    /* Objeto que recibe el contenido de la variable newNote */
    const noteObject = {
    content: newNote,
    date: new Date().toISOString(),
    important: Math.random() > 0.5,
    id: notes.length + 1,
  }
  setNote(note.concat(noteObject))

  setNewNote('')
    console.log('button clicked', event.target)
  }

  return (
    <div>
      <h1>Notes</h1>
        <div>
        <button onClick={() => setShowAll(!showAll)}>show {showAll ? 'important' : 'all' }</button>
        </div>
        <ul>
          {noteList}
        </ul>
        <form onSubmit={addNote}>
          <input value={newNote} onChange={handleChange} />
          <button type="submit">save</button>
        </form>
    </div>
  )
}

export default App
