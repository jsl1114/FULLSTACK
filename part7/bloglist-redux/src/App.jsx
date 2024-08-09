import { useState, useEffect, useRef } from 'react'

import Header from './components/Header'
import Footer from './components/Footer'
import blogService from './services/Blog'
import Notification from './components/Notification'
import MainScreen from './components/MainScreen'
import LoginForm from './components/LoginForm'
import Users from './components/Users'
import User from './components/User'
import BlogPage from './components/BlogPage'

import { useDispatch, useSelector } from 'react-redux'
import { changeNotification } from './reducers/notificationReducer'
import { initializeBlogs } from './reducers/blogsReducer'
import { setUser } from './reducers/userReducer'

import { Route, Routes, useMatch } from 'react-router-dom'
import { initializeUsers } from './reducers/usersReducer'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
  }, [dispatch])

  useEffect(() => {
    const userJSON = window.localStorage.getItem('loggedBlogappUser')
    if (userJSON) {
      const user = JSON.parse(userJSON)
      dispatch(setUser(user))
      blogService.setToken(user.data.token)
      dispatch(changeNotification(`Logged in as ${user.data.name}`))
    }
  }, [])

  const blogFormRef = useRef()

  const user = useSelector((s) => s.user)

  if (!user) {
    return (
      <div>
        <LoginForm />
        <Notification />
      </div>
    )
  }

  return (
    <>
      <Header />
      <a href='/'>Home</a>
      {' | '}
      <a href='/users'>Users</a>

      <Routes>
        <Route
          path='/'
          element={<MainScreen blogFormRef={blogFormRef} />}
        />
        <Route
          path='/users'
          element={<Users />}
        />
        <Route
          path='/users/:id'
          element={<User />}
        />
        <Route
          path='/blogs/:id'
          element={<BlogPage />}
        />
      </Routes>
      <Footer />
    </>
  )
}
export default App
