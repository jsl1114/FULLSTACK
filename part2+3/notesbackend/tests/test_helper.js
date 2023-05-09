const Note = require('../models/note')
const User = require('../models/users')

const initialNotes = [
  { content: 'HTML is easy', important: false },
  { content: 'Browser can execute only JavaScript', important: true },
]

const testingCredentials = {
  username: 'jsl1114',
  name: 'Jason Liu',
  password: 'jason1114',
}

const nonExistId = async () => {
  const note = new Note({ content: 'willremovethissoon' })
  await note.save()
  await note.deleteOne()

  return note._id.toString()
}

const noteInDb = async () => {
  const notes = await Note.find({})
  return notes.map((note) => note.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map((user) => user.toJSON())
}

module.exports = {
  initialNotes,
  testingCredentials,
  nonExistId,
  noteInDb,
  usersInDb,
}
