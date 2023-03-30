const Person = ({person, deletePerson}) => {
  return (
    <div key={person.id}>
      {person.name} {person.number}
      <button key={person.name} onClick={deletePerson}>Delete</button>
    </div>
  )
}
export default Person