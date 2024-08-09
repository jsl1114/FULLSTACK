import { useState } from 'react'

import { useDispatch } from 'react-redux'
import { setUser } from '../reducers/userReducer'
import { changeNotification } from '../reducers/notificationReducer'

import loginService from '../services/Login'
import blogService from '../services/Blog'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      console.log(JSON.stringify(user))
      blogService.setToken(user.data.token)
      dispatch(setUser(user))
      dispatch(changeNotification(`Logged in as ${user.data.username}`))
      setUsername('')
      setPassword('')
    } catch (error) {
      dispatch(changeNotification(`Wrong Credentials`))
    }
  }

  return (
    <div className='loginForm'>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type='text'
            name='Username'
            value={username}
            onChange={({ target }) => {
              setUsername(target.value)
            }}
          />
        </div>
        <div>
          password
          <input
            type='password'
            name='Password'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button
          className='viewbtn'
          type='submit'
        >
          login
        </button>
      </form>
    </div>
  )
}

export default LoginForm
