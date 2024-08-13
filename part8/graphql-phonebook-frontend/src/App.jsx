import { useState } from 'react'
import { useApolloClient, useQuery } from '@apollo/client'

import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import LoginForm from './components/LoginForm'
import PhoneForm from './components/PhoneForm'

import { ALL_PERSONS } from './queries'

const App = () => {
  const [token, setToken] = useState(null)
  const [errorMsg, setErrorMsg] = useState('')
  const result = useQuery(ALL_PERSONS)
  const client = useApolloClient()

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  const notify = (msg) => {
    setErrorMsg(msg)
    setTimeout(() => {
      setErrorMsg('')
    }, 5000)
  }

  const Notify = ({ errorMessage }) => {
    if (!errorMessage) {
      return null
    }

    return (
      <div style={{ color: 'red' }}>
        <b>{errorMessage}</b>
      </div>
    )
  }

  if (!token) {
    return (
      <div>
        <Notify errorMessage={errorMsg} />
        <LoginForm
          setToken={setToken}
          setError={notify}
        />
      </div>
    )
  }

  if (result.loading) {
    return <div>loading...</div>
  }

  return (
    <div>
      <Notify errorMessage={errorMsg} />
      <button onClick={logout}>logout</button>
      <Persons persons={result.data.allPersons} />
      <PersonForm setError={notify} />
      <PhoneForm setError={notify} />
    </div>
  )
}
export default App
