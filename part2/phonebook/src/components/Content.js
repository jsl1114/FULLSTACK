import Person from "./Person"

const Content = ({ persons, deletePerson }) => {
  return (
    <div>
      {persons.map((person) => {
        return (
          <Person
            person={person}
            deletePerson={() => deletePerson(person.id)}
            key={person.id}
          />
        )
      })}
    </div>
  )
}
export default Content
