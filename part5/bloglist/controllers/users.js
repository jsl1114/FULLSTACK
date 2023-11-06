const userRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

userRouter.post('/', async (req, res) => {
  const { username, name, password } = req.body

  if (password.length < 3) {
    res.status(400).json({ error: 'password length must be > 3' })
  }
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash,
  })

  const savedUser = await user.save()
  res.json(savedUser)
})

userRouter.get('/', async (req, res) => {
  const users = await User.find({}).populate('blogs')

  res.json(users)
})

userRouter.delete('/all', async (req, res) => {
  await User.deleteMany({})
  res.json({ msg: "cleared" })
})

module.exports = userRouter
