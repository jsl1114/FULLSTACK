require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./model/person')

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(morgan('tiny'))

// INFO
app.get('/info', (req, res) => {
  const currentTime = new Date().toLocaleString()
  Person.find({}).then((persons) => {
    res.send(
      `<div>
        <p>Phonebook has info for ${persons.length} people</p>
      </div>
      <div>
        <p>${currentTime}</p>
      </div>`
    )
  })
})

// PHONEBOOK SERVICES
app.get('/api/persons', (req, res) => {
  Person.find({}).then((persons) => {
    res.json(persons)
  })
})

app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id)
    .then((p) => {
      res.json(p)
    })
    .catch((err) => next(err))
})

app.post('/api/persons', (req, res, next) => {
  const body = req.body

  if (body.name === undefined || body.number === undefined) {
    res.status(400).json({ err: 'content missing' }).end()
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  })

  person
    .save()
    .then((p) => {
      res.json(p)
    })
    .catch((err) => next(err))
})

app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then(() => {
      res.status(204).end()
    })
    .catch((err) => next(err))
})

app.put('/api/persons/:id', (req, res, next) => {
  const { name, number } = req.body

  Person.findByIdAndUpdate(
    req.params.id,
    { name, number },
    { new: true, runValidators: true, context: 'query' }
  )
    .then((p) => {
      res.json(p)
    })
    .catch((err) => next(err))
})

const errorHandler = (err, req, res, next) => {
  console.error(err.message)

  if (err.name === 'CastError') {
    return res.status(500).send({ error: 'malformatted id' })
  } else if (err.name === 'ValidationError') {
    return res.status(400).json({ err: err.message })
  }

  next(err)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`)
})
