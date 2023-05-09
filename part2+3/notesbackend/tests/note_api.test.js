const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const bcrypt = require('bcrypt')
const User = require('../models/users')
const app = require('../app')
const api = supertest(app)

const Note = require('../models/note')

beforeEach(async () => {
  await Note.deleteMany({})
  console.log('cleared')
  const user = await api.post('/api/login').send(helper.testingCredentials)

  if (user) {
    for (let note of helper.initialNotes) {
      let noteObj = new Note(note)
      await noteObj.save()
      console.log(
        `Saved note ${note.content.split(' ')[0]} ${
          note.content.split(' ')[1]
        }...`
      )
    }
  }
})

describe('GET', () => {
  test('Notes are returned as json', async () => {
    console.log('Entered test')
    await api
      .get('/api/notes')
      .expect(200)
      .expect('Content-Type', /application\/json/) // regex
  })

  test('All notes are returned', async () => {
    const response = await api.get('/api/notes')

    expect(response.body).toHaveLength(helper.initialNotes.length)
  })

  test('a specific note is within the returned notes', async () => {
    const response = await api.get('/api/notes')

    const content = response.body.map((r) => r.content)
    expect(content).toContain('Browser can execute only JavaScript')
  })

  test('a specific note can be viewed', async () => {
    const notesAtStart = await helper.noteInDb()

    const noteToView = notesAtStart[0]

    const resultNote = await api
      .get(`/api/notes/${noteToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(resultNote.body).toEqual(noteToView)
  })
})

describe('POST', () => {
  test('a valid note can be added', async () => {
    const newNote = {
      content: 'async/await simplifies making async calls',
      important: true,
    }

    await api
      .post('/api/notes')
      .send(newNote)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const noteAtEnd = await helper.noteInDb()
    expect(noteAtEnd).toHaveLength(helper.initialNotes.length + 1)

    const contents = noteAtEnd.map((n) => n.content)
    expect(contents).toContain('async/await simplifies making async calls')
  })

  test('note without content is not added', async () => {
    const newNote = {
      important: true,
    }

    await api.post('/api/notes').send(newNote).expect(400)

    const noteAtEnd = await helper.noteInDb()

    expect(noteAtEnd).toHaveLength(helper.initialNotes.length)
  })
})

describe('DELETE', () => {
  test('a note can be deleted', async () => {
    const notesAtStart = await helper.noteInDb()
    const noteToDelete = notesAtStart[0]

    await api.delete(`/api/notes/${noteToDelete.id}`).expect(204)

    const notesAtEnd = await helper.noteInDb()

    expect(notesAtEnd).toHaveLength(helper.initialNotes.length - 1)

    const contents = notesAtEnd.map((n) => n.content)
    expect(contents).not.toContain(noteToDelete.content)
  })
})

describe('where there is initially one user in db,', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('create succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'userx',
      name: 'Jason Liu',
      password: 'jasonisgod',
    }

    await api
      .post('/api/user')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toEqual(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(user => user.username)
    expect(usernames).toContain(newUser.username)
  })

  test('create fails for a duplicate username with proper statuscode and message', async () => {
    const usersAtStart = await helper.usersInDb()
    const newUser = {
      username: 'root',
      name: 'niga',
      password: 'sjdalk',
    }

    const res = await api.post(newUser).expect(400).expect('Content-Type', /application\/json/)

    expect(res.body.error).toContain('expected `username` to be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toEqual(usersAtStart)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})
