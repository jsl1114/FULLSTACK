require("dotenv").config()
const express = require("express")
const app = express()
const morgan = require("morgan")
const cors = require("cors")
const Note = require("./models/note")

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

app.get("/api/notes", (req, res) => {
  Note.find({}).then((notes) => {
    res.json(notes)
  })
})

app.post("/api/notes", (req, res) => {
  const body = req.body

  if (body.content === undefined) {
    res.status(400).json({
      error: "content missing",
    })
  }

  const note = new Note({
    content: body.content,
    important: body.important || false,
  })

  note.save().then((saved) => {
    res.json(saved)
  })
})

app.get("/api/notes/:id", (req, res) => {
  Note.findById(req.params.id).then((note) => {
    res.json(note)
  })
})

app.delete("/api/notes/:id", (req, res, next) => {
  Note.findByIdAndRemove(req.params.id)
    .then((note) => {
      res.status(204).end()
    })
    .catch((err) => next(err))
})

app.put("/api/notes/:id", (req, res, next) => {
  const body = req.body

  const updatedNote = {
    content: body.content,
    important: body.important || false,
  }

  Note.findByIdAndUpdate(req.params.id, updatedNote, { new: true }).then(
    (note) => {
      res.json(note)
    }
  )
  .catch(err => next(err))
})

app.use(unknownPath)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`)
})
