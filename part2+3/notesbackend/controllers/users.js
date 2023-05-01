const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/users')

usersRouter.post('/', async (req, res) => {
  const { username, name, password } = req.body

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash,
  })

  const savedUser = await user.save()

  res.status(201).json(savedUser)
})

usersRouter.get('/', async (req, res) => {
  const users = await User.find({}).populate('notes')
  res.json(users)
})

usersRouter.delete('/:id', async (req, res) => {
  const deletedUser = await User.findByIdAndRemove(req.params.id)
  res.json(deletedUser)
})

module.exports = usersRouter
