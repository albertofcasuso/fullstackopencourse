import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Note from './components/Note'


const App = (props) => {


  const [note, setNote] = useState([])
  const [newNote, setNewNote] = useState('a new note...')
  const [showAll, setShowAll] = useState(true)

  /*Use effect se ejecuta despues del render*/
  const fetchData = () =>{
    console.log('effect')
    axios
    .get('http://localhost:3001/notes')
    .then(response => {
      console.log('promise fulfilled')
      setNote(response.data)
    })
  }
  useEffect(fetchData,[])
  /*Este clog se ejecuta al leer el programa*/
  console.log('render', note.length, 'note')

  const notesToShow = showAll ? note : note.filter(note => note.important)

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
    id: note.length + 1,
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
        {console.log('soy el html')}
    </div>
  )
}


export default App
