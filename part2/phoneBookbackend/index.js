const express = require("express")
const app = express()
const morgan = require("morgan")
const cors = require("cors")

app.use(cors())
app.use(express.static("build"))
app.use(express.json())
app.use(morgan("tiny"))

let persons = [
  {
    name: "Arto Hellas",
    number: "040-123456",
    id: 1,
  },
  {
    name: "Ada Lovelace",
    number: "39-44-5323523",
    id: 2,
  },
  {
    name: "Dan Abramov",
    number: "12-43-234345",
    id: 3,
  },
  {
    name: "Mary Poppendieck",
    number: "39-23-6423122",
    id: 4,
  },
]

// PHONEBOOK SERVICES
app.get("/api/persons", (req, res) => {
  res.json(persons)
})

app.get("/api/persons/:id", (req, res) => {
  res.json(persons.find((p) => p.id === Number(req.params.id)))
})

const generatePersonId = () => {
  const maxId = persons.length > 0 ? Math.max(...persons.map((n) => n.id)) : 0
  return maxId + 1
}

app.post("/api/persons", (req, res) => {
  const body = req.body

  if (!body.number || !body.name) {
    res.status(400).json({
      error: "number or name missing",
    })
  }

  const newPerson = {
    name: body.name,
    number: body.number,
    id: generatePersonId(),
  }

  persons = persons.concat(newPerson)

  res.json(newPerson)
})

// app.delete(
//   ("/api/persons/:id", (req, res) => {
//     const id = Number(req.params.id)
//     const match = persons.find((p) => p.id === id)

//     match
//       ? ((persons = persons.filter((p) => p.id !== id)), res.json(match))
//       : res.status(204).end()
//   })
// )

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id)
  const personToDelete = persons.find(p => p.id === id)

  if (personToDelete) {
    persons = persons.filter(p => p.id !== id)
    res.json(personToDelete)
  } else {
    res.status(204).json({ err: "no person"}).end()
  }
})


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`)
})
