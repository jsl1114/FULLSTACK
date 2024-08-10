import { useState } from 'react'
import { useQuery } from '@apollo/client'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'

import { ALL_PERSONS } from './queries'
import PhoneForm from './components/PhoneForm'

const App = () => {
  const [errorMsg, setErrorMsg] = useState('')
  const result = useQuery(ALL_PERSONS)

  if (result.loading) {
    return <div>loading...</div>
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

  return (
    <div>
      <Notify errorMessage={errorMsg} />
      <Persons persons={result.data.allPersons} />
      <PersonForm setError={notify} />
      <PhoneForm setError={notify} />
    </div>
  )
}
export default App
