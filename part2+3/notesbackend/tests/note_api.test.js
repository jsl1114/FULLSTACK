const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Note = require('../models/note')

const initialNotes = [
  { content: 'HTML is easy', important: false },
  { content: 'Browser can execute only JavaScript', important: true },
]

beforeEach(async () => {
  await Note.deleteMany({})
  let noteObj = new Note(initialNotes[0])
  await noteObj.save()
  noteObj = new Note(initialNotes[1])
  await noteObj.save()
})

test('Notes are returned as json', async () => {
  await api
    .get('/api/notes')
    .expect(200)
    .expect('Content-Type', /application\/json/) // regex
})

test('All notes are returned', async () => {
  const response = await api.get('/api/notes')

  expect(response.body).toHaveLength(initialNotes.length)
})

test('a specific note is within the returned notes', async () => {
  const response = await api.get('/api/notes')

  const content = response.body.map(r => r.content)
  expect(content).toContain(
    'Browser can execute only JavaScript'
  )
})

afterAll(async () => {
  await mongoose.connection.close()
})
