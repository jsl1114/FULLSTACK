const notesRouter = require('express').Router()
const Note = require('../models/note')

notesRouter.get('/', (req, res) => {
  Note.find({}).then((notes) => {
    res.json(notes)
  })
})

notesRouter.post('/', (req, res, next) => {
  const body = req.body

  if (body.content === undefined) {
    res.status(400).json({
      error: 'content missing',
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

notesRouter.get('/:id', (req, res, next) => {
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

notesRouter.delete('/:id', (req, res, next) => {
  Note.findByIdAndRemove(req.params.id)
    .then(() => {
      res.status(204).end()
    })
    .catch((err) => next(err))
})

notesRouter.put('/:id', (req, res, next) => {
  const { content, important } = req.body

  Note.findByIdAndUpdate(
    req.params.id,
    { content, important },
    { new: true, runValidators: true, context: 'query' }
  )
    .then((note) => {
      res.json(note)
    })
    .catch((err) => next(err))
})

module.exports = notesRouter
