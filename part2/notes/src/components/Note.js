const Note = ({note, toggleImportance, deleteNote}) => {
  const label = note.important ? 'change to unimportant' : 'change to important'

  return (
    <li className="note" key={note.id}>
      {note.content}
    <button onClick={toggleImportance}>{label}</button>
    <button onClick={deleteNote}>delete</button>
    </li>
  )
}
export default Note