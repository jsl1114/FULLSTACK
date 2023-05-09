import { useState, useEffect } from 'react'
import Note from './components/Note'
import noteService from './service/Note'
import loginService from './service/Login'
import Notification from './components/Notification'
import Footer from './components/Footer'

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [errMsg, setErrMsg] = useState(null)
  const [successMsg, setSuccessMsg] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const handleLogin = async (event) => {
    event.preventDefault()
    setErrMsg(`Logging in with ${username}, ${password}`)
    setTimeout(() => {
      setErrMsg(null)
    }, 3000)
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user))
      noteService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrMsg('Wrong Credentials')
      setTimeout(() => {
        setErrMsg(null)
      }, 5000)
    }
  }

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      noteService.setToken(user.token)
    }
  }, [])
  console.log(`rendered ${notes.length} notes`)

  const notesToShow = showAll ? notes : notes.filter((note) => note.important)

  const addNote = (e) => {
    e.preventDefault()
    const noteObject = {
      content: newNote,
      important: Math.random() > 0.5,
      id: notes.length + 1,
    }

    noteService.create(noteObject).then((res) => {
      setNotes(notes.concat(res.data))
      setNewNote('')
      setSuccessMsg(`Added note "${noteObject.content}"`)
      setTimeout(() => {
        setSuccessMsg(null)
      }, 5000)
    })
  }

  const handleNoteChange = (event) => {
    setNewNote(event.target.value)
  }

  const toggleImportanceOf = (id) => {
    const note = notes.find((n) => n.id === id)
    const changedNote = { ...note, important: !note.important }

    noteService
      .update(id, changedNote)
      .then((res) => {
        setNotes(notes.map((note) => (note.id !== id ? note : res.data)))
        setSuccessMsg(
          `changed to ${
            res.data.important === true ? 'imoprtant' : 'unimportant'
          }`
        )
        setTimeout(() => {
          setSuccessMsg(null)
        }, 3000)
      })
      .catch((err) => {
        setErrMsg(
          `Note ${note.content} has been removed from server.`
        ).setTimeout(() => {
          setErrMsg(null)
        }, 5000)
        setNotes(notes.filter((note) => note.id !== id))
      })
  }

  const deleteNote = (id) => {
    noteService.remove(id).then(setNotes(notes.filter((n) => n.id !== id)))
  }

  const onEditNote = (id) => {
    const updatedNote = {
      content: window.prompt(
        'What would you like to change it to? (More than 5 chars)'
      ),
      important: window.confirm('Set important?') ? true : false,
    }

    noteService
      .update(id, updatedNote)
      .then((res) => {
        setNotes(notes.map((n) => (n.id === id ? res.data : n)))
      })
      .catch((err) =>
        window.alert('content less than 5 chars, nothing changed')
      )
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        Username
        <input
          type='text'
          value={username}
          onChange={({ target }) => setUsername(target.value)}
          placeholder='enter your username'
        />
      </div>
      <div>
        Password
        <input
          type='password'
          value={password}
          onChange={({ target }) => setPassword(target.value)}
          placeholder='enter your password'
        />
      </div>
      <button type='submit'>Login</button>
    </form>
  )

  const noteForm = () => (
    <form onSubmit={addNote}>
      <input
        onChange={handleNoteChange}
        placeholder='Add a new note'
      />
      <button type='submit'>Save</button>
    </form>
  )

  return (
    <div>
      <h1>Notes</h1>
      <Notification
        type='error'
        msg={errMsg}
      />
      <Notification
        type='success'
        msg={successMsg}
      />

      {!user && loginForm()}
      {user && (
        <div>
          <p>${user.name} logged in</p>
          {noteForm()}
        </div>
      )}

      <div onClick={() => setShowAll(!showAll)}>
        <button>Show {showAll ? 'important' : 'all'}</button>
      </div>
      <ul>
        {notesToShow.map((note) => (
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => {
              toggleImportanceOf(note.id)
            }}
            deleteNote={() => {
              deleteNote(note.id)
            }}
            onEdit={() => {
              onEditNote(note.id)
            }}
          />
        ))}
      </ul>
      <Footer />
    </div>
  )
}

export default App
