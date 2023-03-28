require("dotenv").config()
const express = require("express")
const app = express()
const morgan = require("morgan")
const cors = require("cors")
const Person = require("./model/person")

app.use(cors())
app.use(express.static("build"))
app.use(express.json())
app.use(morgan("tiny"))

// PHONEBOOK SERVICES
app.get("/api/persons", (req, res) => {
  Person.find({}).then((persons) => {
    res.json(persons)
  })
})

app.get("/api/persons/:id", (req, res) => {
  Person.findById(req.params.id).then((p) => {
    res.json(p)
  })
})

app.post("/api/persons", (req, res) => {
  const body = req.body

  if (body.name === undefined || body.number === undefined) {
    res.status(400).json({ err: "content missing" }).end()
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  })

  person.save().then((p) => {
    res.json(p)
  })
})

app.delete("/api/persons/:id", (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then((p) => {
      res.status(204).end()
    })
    .catch((err) => next(err))
})

app.put("/api/persons/:id", (req, res, next) => {
  const body = req.body

  const updatedPerson = {
    name: body.name,
    number: body.number,
  }

  Person.findByIdAndUpdate(req.params.id, updatedPerson, { new: true })
    .then((p) => {
      res.json(p)
    })
    .catch((err) => next(err))
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`)
})
