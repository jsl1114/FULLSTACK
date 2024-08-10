/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import { useMutation } from '@apollo/client'

import { EDIT_PHONE } from '../queries'

const PhoneForm = ({ setError }) => {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')

  const [changeNumber, result] = useMutation(EDIT_PHONE)

  const submit = (e) => {
    e.preventDefault()

    changeNumber({ variables: { name, phone } })

    setName('')
    setPhone('')
  }

  useEffect(() => {
    if (result.data && result.data.editNumber === null) {
      setError(`Person not found`)
    }
  }, [result.data])

  return (
    <div>
      <h2>Update a number</h2>
      <form onSubmit={submit}>
        <div>
          name:{' '}
          <input
            type='text'
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div>
        <div>
          updated phone #:{' '}
          <input
            type='text'
            value={phone}
            onChange={({ target }) => setPhone(target.value)}
          />
        </div>
        <button type='submit'>update</button>
      </form>
    </div>
  )
}

export default PhoneForm
