const notesRouter = require('express').Router()
const Note = require('../models/note')
const User = require('../models/users')
const jwt = require('jsonwebtoken')

notesRouter.get('/', async (req, res) => {
  const notes = await Note.find({})
  res.json(notes)
})

const getTokenFrom = (req) => {
  const auth = req.get('Authorization')
  if (auth && auth.startsWith('Bearer ')) {
    return auth.replace('Bearer ', '')
  }
  return null
}

notesRouter.post('/', async (req, res) => {
  const body = req.body

  const decodedToken = jwt.verify(getTokenFrom(req), process.env.SECRET)
  if (!decodedToken.id) {
    return res.status(401).json({ error: 'invalid token' })
  }

  const user = await User.findById(decodedToken.id)

  const note = new Note({
    content: body.content,
    important: body.important || false,
    user: user.id,
  })

  // Don't need try-catch anymore due to express-async-error dependency
  const savedNote = await note.save()
  user.notes = user.notes.concat(savedNote._id)
  await user.save()
  res.status(201).json(savedNote)
})

notesRouter.get('/:id', async (req, res) => {
  const note = await Note.findById(req.params.id)
  if (note) {
    res.json(note)
  } else {
    res.status(400).end()
  }
})

notesRouter.delete('/:id', async (req, res) => {
  await Note.findByIdAndRemove(req.params.id)
  res.status(204).end()
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
