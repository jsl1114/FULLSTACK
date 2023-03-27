const express = require("express")
const app = express()
const morgan = require("morgan")
const cors = require("cors")

const unknownPath = (req, res) => {
  res.status(404).json({
    err: "Unknown path",
  })
}

// used to load static files such as HTML, js, etc
app.use(express.static("build"))
app.use(express.json())
app.use(morgan("tiny"))
app.use(cors())

let notes = [
  { id: 1, content: "HTML is easy", important: true },
  {
    id: 2,
    content: "Browser can execute only JavaScript",
    important: false,
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true,
  },
]

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

const generatePersonId = () => {
  const maxId = notes.length > 0 ? Math.max(...persons.map((n) => n.id)) : 0
  return maxId + 1
}

app.post("/api/persons", (req, res) => {
  const body = req.body

  if (!body.content) {
    res.status(400).json({
      error: "content missing",
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

app.delete(
  ("/api/persons/:id",
  (req, res) => {
    const id = Number(req.params.id)
    const match = persons.find((p) => p.id === id)

    match
      ? ((persons = persons.filter((p) => p.id !== id)), res.json(match))
      : res.status(400).json({ err: "Nonexistant" })
  })
)

app.get("/api/notes", (req, res) => {
  res.json(notes)
})

const generateId = () => {
  const maxId = notes.length > 0 ? Math.max(...notes.map((n) => n.id)) : 0
  return maxId + 1
}

app.post("/api/notes", (req, res) => {
  const body = req.body

  if (!body.content) {
    res.status(400).json({
      error: "content missing",
    })
  }

  const newNote = {
    content: body.content,
    important: body.important || false,
    id: generateId(),
  }

  notes = notes.concat(newNote)

  res.json(newNote)
})

app.get("/api/notes/:id", (req, res) => {
  const id = Number(req.params.id)
  const note = notes.find((note) => note.id === id)

  note ? res.json(note) : res.status(404).end()
})

app.delete("/api/notes/:id", (req, res) => {
  const id = Number(req.params.id)
  const note = notes.find((note) => note.id === id)

  note
    ? ((notes = notes.filter((n) => n.id !== id)), res.json(note))
    : res.status(204).end()
})

app.use(unknownPath)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`)
})
