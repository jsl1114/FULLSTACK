import React, { useEffect, useState } from 'react'
import './index.css'
import axios from 'axios'

const useNotes = (url) => {
  const [notes, setNotes] = useState([])
  useEffect(() => {
    axios.get(url).then((res) => setNotes(res.data))
  }, [url])

  return notes
}

const App = () => {
  const [counter, setCounter] = useState(0)
  const [values, setValues] = useState([])

  const notes = useNotes(BACKEND_URL)

  const handleClick = () => {
    setCounter(counter + 1)
    setValues(values.concat(counter))
  }

  return (
    <div className='container'>
      hello webpack {counter} clicks
      <button onClick={handleClick}>press</button>
      {values.flatMap((v) => (
        <p>{v}</p>
      ))}
      <h3>
        there are {notes.length} notes on server {BACKEND_URL}
      </h3>
    </div>
  )
}

export default App
