import { useState } from "react"
import Search from "./components/Search"
import AddNew from "./components/AddNew"
import Numbers from "./components/Numbers"

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ])
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")

  const addNew = (e) => {
    e.preventDefault()
    const newPerson = {
      name: newName,
      number: newNumber,
    }
    const checkDuplicate = persons.filter((person) => person.name === newName)

    checkDuplicate.length !== 0
      ? alert(`${newName} is already in the phonebook`)
      : setPersons(persons.concat(newPerson))

    setNewName("")
  }

  const handleNameChange = (e) => {
    setNewName(e.target.value)
  }

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value)
  }

  const handleSearch = (e) => {
    const result = persons.filter((person) => {
      if (e.target.value === "") return persons
      return person.name.toLowerCase().includes(e.target.value.toLowerCase())
    })
    setPersons(result)
  }
  
  return (
    <div>
      <h2>Phonebook</h2>
      <Search persons={persons} handleSearch={handleSearch}/>
      <AddNew handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} addNew={addNew}/>
      <Numbers persons={persons}/>
    </div>
  )
}

export default App
