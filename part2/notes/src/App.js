import React, {useState, useEffect} from 'react'
import noteService from './services/notes'
import Note from './components/Note'


const App = (props) => {


  const [note, setNote] = useState([])
  const [newNote, setNewNote] = useState('a new note...')
  const [showAll, setShowAll] = useState(true)

  /*Use effect se ejecuta despues del render*/
  const fetchData = () =>{
    noteService.getAll()
    .then(initialNotes => {
      setNote(initialNotes)
    })
  }
  useEffect(fetchData,[])

  const notesToShow = showAll ? note : note.filter(note => note.important)

 const toggleImportanceOf = id => {
  const nota = note.find(n => n.id === id)
  const changedNote = { ...nota, important: !nota.important }

  noteService.update(id,changedNote).then(response => {
    setNote(note.map(n => n.id !== id ? n : response.data))
  })
}

  const noteList = notesToShow.map(
    nota =>
      <Note key={nota.id}
            note={nota}
            toggleImportance={() => toggleImportanceOf(nota.id)}
            />
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
    important: Math.random() > 0.5
  }



  noteService.create(noteObject)
  .then(returnedNote => {
    setNote(note.concat(returnedNote))
    setNewNote('')
  }
  )
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
