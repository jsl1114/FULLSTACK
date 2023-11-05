import { useState, useEffect, useRef } from 'react'
import Note from './components/Note'
import noteService from './service/Note'
import loginService from './service/Login'
import Notification from './components/Notification'
import Footer from './components/Footer'
import LoginForm from './components/LoginForm'
import NoteForm from './components/NoteForm'
import Toggleable from './components/Toggleable'

const App = () => {
  const [notes, setNotes] = useState([])
  const [showAll, setShowAll] = useState(true)
  const [errMsg, setErrMsg] = useState(null)
  const [successMsg, setSuccessMsg] = useState(null)
  const [user, setUser] = useState(null)
  const [loggedIn, setLoggedIn] = useState(false)

  const noteFormRef = useRef()

  useEffect(() => {
    noteService.getAll().then((init) => setNotes(init))
  }, [])

  const handleLogin = async (loginObj) => {
    setErrMsg(`Logging in with ${loginObj.username}, ${loginObj.password}`)
    setTimeout(() => {
      setErrMsg(null)
    }, 3000)
    try {
      const user = await loginService.login(loginObj)
      window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user))
      noteService.setToken(user.token)
      setUser(user)
    } catch (exception) {
      setErrMsg('Wrong Credentials')
      setTimeout(() => {
        setErrMsg(null)
      }, 3000)
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    setSuccessMsg('Logging out')
    setTimeout(() => {
      setSuccessMsg(null)
      setLoggedIn(false)
      window.localStorage.removeItem('loggedNotesappUser')
    }, 2000)
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

  const addNote = (noteObject) => {
    noteFormRef.current.toggleVisibility()
    noteService.create(noteObject).then((res) => {
      setNotes(notes.concat(res.data))
      setSuccessMsg(`Added note "${noteObject.content}"`)
      setTimeout(() => {
        setSuccessMsg(null)
      }, 5000)
    })
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

  // const onEditNote = (id) => {
  //   const updatedNote = {
  //     content: window.prompt(
  //       'What would you like to change it to? (More than 5 chars)'
  //     ),
  //     important: window.confirm('Set important?') ? true : false,
  //   }

  //   noteService
  //     .update(id, updatedNote)
  //     .then((res) => {
  //       setNotes(notes.map((n) => (n.id === id ? res.data : n)))
  //     })
  //     .catch((err) =>
  //       window.alert('content less than 5 chars, nothing changed')
  //     )
  // }

  if (user) {
    return (
      <div className='content'>
        <h1>Notes</h1>
        <Notification
          type='error'
          msg={errMsg}
        />
        <Notification
          type='success'
          msg={successMsg}
        />

        {user && (
          <div>
            <p>
              {user.name} logged in
              <button
                type='button'
                onClick={() => {
                  window.localStorage.clear()
                  window.location.reload()
                }}
              >
                logout
              </button>
            </p>
            <Toggleable>
              <NoteForm
                createNote={addNote}
                ref={noteFormRef}
              />
            </Toggleable>
          </div>
        )}

        <button onClick={() => setShowAll(!showAll)}>
          Show {showAll ? 'important' : 'all'}
        </button>

        <ul>
          {notesToShow.map((note) => (
            <Note
              key={note.id}
              note={note}
              toggleImportance={() => {
                toggleImportanceOf(note.id)
              }}
            />
          ))}
        </ul>

        <Footer />
      </div>
    )
  }

  return (
    <div className='content'>
      <h1>Notes</h1>
      <Notification
        type='error'
        msg={errMsg}
      />
      <Notification
        type='success'
        msg={successMsg}
      />
      <Toggleable>
        <LoginForm handleSubmit={handleLogin} />
      </Toggleable>
      <Footer />
    </div>
  )
}

export default App
