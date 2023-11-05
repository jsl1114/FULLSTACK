import { useState } from 'react'
import PropTypes from 'prop-types'

const LoginForm = (handleSubmit) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const login = (e) => {
    e.preventDefault()
    handleSubmit({ username, password })
  }

  return (
    <div>
      <form onSubmit={login}>
        <div>
          Username
          <input
            type='text'
            value={username}
            onChange={setUsername((e) => e.target.value)}
          />
        </div>
        <div>
          Password
          <input
            type='text'
            value={password}
            onChange={setPassword((e) => e.target.value)}
          />
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
}

export default LoginForm
