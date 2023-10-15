const Note = ({ note, toggleImportance }) => {
  const label = note.important ? 'change to unimportant' : 'change to important'

  return (
    <li className="note" key={note.id}>
      {note.content}
      <button onClick={toggleImportance}>{label}</button>
    </li>
  )
}
export default Note