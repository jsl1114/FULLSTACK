import { useState } from 'react'

const _ = require('lodash')

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')
  const [include, setInclude] = useState(false)

  const addNew = (e) => {
    e.preventDefault()
    const newPerson = {
      name: newName,
    }

    persons.map(person => {
      _.isEqual(newPerson, person) ? setInclude(!include) : {}
    })

    include ? alert(`${newPerson.name} is already here!`) : persons.concat(newPerson)

    setNewName('')
  }

  const handleNameChange = (e) => {
    setNewName(e.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addNew}>
        <div>
          name: <input onChange={handleNameChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {persons.map(person => (
          <p key={person.name}>{person.name}</p>
        ))}
      </div>
    </div>
  )
}

export default App