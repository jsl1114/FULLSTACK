import { useState } from 'react'
import { ALL_AUTHORS, SET_AUTHOR_BIRTH_YEAR } from '../queries'
import { useMutation } from '@apollo/client'
import Select from 'react-select'

const AuthorForm = ({ authors }) => {
  const [name, setName] = useState('')
  const [year, setYear] = useState('')

  const [setBorn] = useMutation(SET_AUTHOR_BIRTH_YEAR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (err) => {
      err.graphQLErrors.map((e) => e.message).forEach((err) => console.log(err))
    },
  })

  const submit = (e) => {
    e.preventDefault()

    setBorn({ variables: { name: name['value'], setBornTo: Number(year) } })

    setName('')
    setYear('')
  }

  const options = authors.map((a) => {
    return { value: a.name, label: a.name }
  })

  return (
    <div>
      <h3>Edit Author Birth Year</h3>
      <form onSubmit={submit}>
        <div>
          name{' '}
          <Select
            defaultInputValue={name}
            value={name}
            onChange={setName}
            options={options}
          />
        </div>
        <div>
          year{' '}
          <input
            type='number'
            value={year}
            onChange={({ target }) => setYear(target.value)}
          />
        </div>
        <button type='submit'>update</button>
      </form>
    </div>
  )
}
export default AuthorForm
