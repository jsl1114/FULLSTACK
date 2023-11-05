import { useState } from 'react'

const NoteForm = ({ createNote }) => {
  const [newNote, setNewNote] = useState('')

  const addNote = (e) => {
    e.preventDefault()
    const noteObject = {
      content: newNote,
      important: Math.random() > 0.5,
    }
    createNote(noteObject)

    setNewNote('')
  }

  return (
    <form onSubmit={addNote}>
      <input
        onChange={(e) => setNewNote(e.target.value)}
        placeholder='Add a new note'
        value={newNote}
      />
      <button type='submit'>Save</button>
    </form>
  )
}

export default NoteForm
