const Note = ({note, toggleImportance, deleteNote, onEdit}) => {
  const label = note.important ? 'change to unimportant' : 'change to important'

  return (
    <li className="note" key={note.id}>
      {note.content}
    <button onClick={toggleImportance}>{label}</button>
    <button onClick={onEdit}>edit</button>
    <button onClick={deleteNote}>delete</button>
    </li>
  )
}
export default Note