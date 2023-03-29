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

app.post("/api/notes", (req, res, next) => {
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

  note
    .save()
    .then((saved) => {
      res.json(saved)
    })
    .catch((err) => next(err))
})

app.get("/api/notes/:id", (req, res, next) => {
  Note.findById(req.params.id)
    .then((note) => {
      if (note) {
        res.json(note)
      } else {
        res.status(404).end()
      }
    })
    .catch((err) => {
      next(err)
    })
})

app.delete("/api/notes/:id", (req, res, next) => {
  Note.findByIdAndRemove(req.params.id)
    .then(() => {
      res.status(204).end()
    })
    .catch((err) => next(err))
})

app.put("/api/notes/:id", (req, res, next) => {
  const { content, important } = req.body

  Note.findByIdAndUpdate(
    req.params.id,
    { content, important },
    { new: true, runValidators: true, context: "query" }
  )
    .then((note) => {
      res.json(note)
    })
    .catch((err) => next(err))
})

app.use(unknownPath)

const errorHandler = (err, req, res, next) => {
  console.error(err.message)

  if (err.name === "CastError") {
    return res.status(500).send({ error: "malformatted id" })
  } else if (err.name === "ValidationError") {
    return res.status(400).json({ error: err.message })
  }

  next(err)
}

// HAS TO BE THE LAST LOADED MIDDLEWARE
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`)
})
