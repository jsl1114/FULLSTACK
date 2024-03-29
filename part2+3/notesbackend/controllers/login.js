const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/users')

loginRouter.post('/', async (req, res) => {
  const { username, password } = req.body

  const user = await User.findOne({ username })
  const passwordCorrect =
    user === null ? false : await bcrypt.compare(password, user.passwordHash)

  if (!(user && passwordCorrect)) {
    return res.status(401).json({
      error: 'invalid username or password',
    })
  }

  const userForToken = {
    username: username,
    id: user._id,
  }

  // Token expires in 60*60s or 1hr
  const token = jwt.sign(userForToken, process.env.SECRET, {
    expiresIn: 60 * 60,
  })

  res.status(200).send({ token, username: user.username, name: user.name })
})

module.exports = loginRouter
