import { useState, useEffect, useRef } from 'react'

import Header from './components/Header'
import Footer from './components/Footer'
import blogService from './services/Blog'
import loginService from './services/Login'
import BlogForm from './components/BlogForm'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Toggleable from './components/Toggleable'

// { title: 'JJJJSASDSDAWDWA', author: 'maskedJJ', url: 'haha' }, { title: 'How to make Kungpao Chicken by jaso', author: 'maskedJJ', url: 'haha' }

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notificationMsg, setNotificationMsg] = useState(null)

  useEffect(() => {
    blogService.getAll().then((initial) => setBlogs(initial.sort(sortByLikes)))
  }, [])

  useEffect(() => {
    const userJSON = window.localStorage.getItem('loggedBlogappUser')
    if (userJSON) {
      console.log(userJSON)
      const user = JSON.parse(userJSON)
      setUser(user)
      blogService.setToken(user.data.token)
      setNotificationMsg(`Logged in as ${user.data.name}`)
      setTimeout(() => {
        setNotificationMsg(null)
      }, 2000)
    }
  }, [])

  const blogFormRef = useRef()

  const sortByLikes = (a, b) => {
    return b - a
  }

  const handleSave = (newBlog) => {
    blogFormRef.current.toggleVisibility()
    blogService.create(newBlog).then((res) => {
      setBlogs(blogs.concat(res))
      setNotificationMsg(`New blog ${newBlog.title} saved.`)
      setTimeout(() => {
        setNotificationMsg(null)
      }, 2000)
    })
  }

  const handleLike = (id) => {
    const match = blogs.find((blog) => blog.id === id)

    blogService
      .update(id, { ...match, likes: match.likes + 1 })
      .then((res) => setBlogs(blogs.map((b) => (b.id === id ? res.data : b))))
  }

  const handleDelete = (id) => {
    if (
      window.confirm(`Remove blog ${blogs.filter((b) => b.id === id)[0].title}`)
    )
      blogService
        .remove(id)
        .then(() => setBlogs(blogs.filter((b) => b.id !== id)))
  }

  const loginForm = () => (
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
          type='text'
          name='Password'
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type='submit'>login</button>
    </form>
  )

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      console.log(JSON.stringify(user))
      blogService.setToken(user.data.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (error) {
      setNotificationMsg('Wrong username or password')
      setTimeout(() => {
        setNotificationMsg(null)
      }, 2000)
    }
  }

  const handleLogout = () => {
    if (window.confirm('Do you want to log out?')) {
      window.localStorage.clear()
      window.location.reload()
      setNotificationMsg('You are logged out')
      setTimeout(() => {
        setNotificationMsg(null)
      }, 2000)
    }
  }

  if (!user) {
    return (
      <div>
        <Header />
        {loginForm()}
        <Notification msg={notificationMsg} />
      </div>
    )
  }

  return (
    <>
      <Header />

      <div className='header'>
        user: {user.data.name}
        <Notification msg={notificationMsg} />
        <button
          className='logoutbtn'
          onClick={handleLogout}
        >
          logout
        </button>
      </div>

      <Toggleable
        buttonLabel={'Add new blog'}
        ref={blogFormRef}
      >
        <BlogForm onSave={handleSave} />
      </Toggleable>

      <div className='blogs'>
        <h1 className='header2'>Blog Posts</h1>
        {blogs.length === 0 && (
          <p className='header2'>nothing to show, start typing!</p>
        )}
        {blogs.map((blog) => (
          <Blog
            key={blog.url}
            title={blog.title}
            author={blog.author}
            url={blog.url}
            likes={blog.likes}
            handleLike={() => handleLike(blog.id)}
            handleDelete={() => handleDelete(blog.id)}
            user={user.data.name}
          />
        ))}
      </div>
      <Footer />
    </>
  )
}
export default App
