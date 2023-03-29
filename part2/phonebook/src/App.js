import { useState, useEffect } from "react"
import Search from "./components/Search"
import AddNew from "./components/AddNew"
import personService from "./service/Person"
import Content from "./components/Content"
import Notification from "./components/Notification"
import axios from "axios"

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [newCur, setNewCur] = useState("")
  const [success, setSuccess] = useState(false)
  const [successMsg, setsuccessMsg] = useState(null)
  const [errorMsg, setErrorMsg] = useState(null)
  const [rates, setRates] = useState({})
  const [currency, setCurrency] = useState(null)
  const [searchBarVal, setSearchBarVal] = useState("")

  useEffect(() => {
    if (currency) {
      console.log("Fetching rates")
      axios
        .get(`https://open.er-api.com/v6/latest/${currency}`)
        .then((res) => {
          setRates(res.data.rates)
        })
        .catch((err) => console.log("err"))
        .finally(console.log("success!"))
    }
  }, [currency])

  useEffect(() => {
    if (searchBarVal !== "") {
      personService.getAll().then((res) => {
        const result = res.filter((person) =>
          person.name.toLowerCase().includes(searchBarVal.toLowerCase())
        )
        setPersons(result)
      })
    }
  }, [searchBarVal])

  useEffect(() => {
    personService.getAll().then((init) => {
      setPersons(init)
    })
  }, [])

  const handleCurChange = (e) => {
    setNewCur(e.target.value)
  }

  const onCurSearch = (e) => {
    e.preventDefault()
    setCurrency(newCur)
  }

  const addNew = (e) => {
    e.preventDefault()
    const newPerson = {
      name: newName,
      number: newNumber,
      id: null,
    }
    const checkDuplicate =
      persons.find(p => p.name === newName)
    const personToModify = 
      persons.find(p => p.name === newName)

    if (checkDuplicate) {
      if (
        window.confirm(
          `${newPerson.name} is already in the phonebook. replace with the new number entered?`
        )
      ) {
        personService
          .update(personToModify.id, newPerson)
          .then( res => {
            setSuccess(true)
            setPersons(
              persons.map((p) => (p.id === personToModify.id ? res.data : p))
            )
          }
          )
          .catch((e) => {
            setSuccess(false)
            setErrorMsg(
              `${newPerson.name} has already been deleted from server`
            )
            setTimeout(() => {
              setErrorMsg(null)
            }, 5000)
          })
          .finally(() => {
            if (success) {
              setsuccessMsg(
                `${personToModify.name}'s number is now replaced to ${newPerson.number}`
              )
              setTimeout(() => {
                setsuccessMsg(null)
                setSuccess(false)
              }, 5000)
            }
          })
      }
    } else {
      personService
        .create(newPerson)
        .then(res => {
          setPersons(persons.concat(res.data))
          setsuccessMsg(`${res.data.name}'s number is now added`)
          setTimeout(() => {
            setsuccessMsg(null)
          }, 3000)
        })
        .catch((error) => {
          setErrorMsg(error.response.data.err)
          setTimeout(() => {
            setErrorMsg(null)
          }, 4000)
        })
    }
  }

  const deletePerson = (id) => {
    const name = persons.find((p) => p.id === id).name
    if (window.confirm(`Delete ${name}?`)) {
      personService
        .remove(id)
        .then(setPersons(persons.filter((person) => person.id !== id)))
    }
  }

  const handleNameChange = (e) => {
    setNewName(e.target.value)
  }

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value)
  }

  const handleSearch = (e) => {
    e.preventDefault()
    setSearchBarVal(e.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification msg={successMsg} type='success' />
      <Notification msg={errorMsg} />
      <Search persons={persons} handleSearch={handleSearch} />
      <AddNew
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        addNew={addNew}
      />
      <h2>Numbers</h2>
      <Content persons={persons} deletePerson={deletePerson} />
      {/* <h2>NEW FEATURE: Currency Rates</h2>
      <form onSubmit={onCurSearch}>
        currency: <input value={newCur} onChange={handleCurChange} />
        <button type="submit">exchange rate</button>
        <pre>
          {JSON.stringify(rates, null, 2)}
        </pre>
      </form> */}
    </div>
  )
}

export default App
