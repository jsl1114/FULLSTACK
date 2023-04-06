import { useState, useEffect } from 'react'

import Header from './components/Header'
import blogService from './services/Blog'
import Blog from './components/Blog'

// { title: 'JJJJSASDSDAWDWA', author: 'maskedJJ', url: 'haha' }, { title: 'How to make Kungpao Chicken by jaso', author: 'maskedJJ', url: 'haha' }

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [author, setAuthor] = useState('')
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    blogService.getAll().then((initial) => setBlogs(initial))
  }, [])

  const handleSave = (e) => {
    e.preventDefault()
    const newBlog = {
      title: title,
      author: author,
      url: url,
      likes: 0,
      id: null,
    }

    blogService.create(newBlog).then((res) => {
      setBlogs(blogs.concat(res.data))
      setAuthor('')
      setTitle('')
      setUrl('')
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
      blogService.remove(id).then(() => setBlogs(blogs.filter((b) => b.id !== id)))
  }

  return (
    <>
      <Header />
      <div className='blogform'>
        <h2 key='h2'>Save a new blog here</h2>
        <form
          className='blogformprop'
          onSubmit={handleSave}
        >
          <label htmlFor='title'>title</label>
          <input
            name='title'
            type='text'
            value={title}
            onChange={(e) => {
              e.preventDefault()
              setTitle(e.target.value)
            }}
          />
          <label htmlFor='author'>author</label>
          <input
            name='author'
            type='text'
            value={author}
            onChange={(e) => {
              e.preventDefault()
              setAuthor(e.target.value)
            }}
          />
          <label htmlFor='url'>url</label>
          <input
            name='url'
            type='text'
            value={url}
            onChange={(e) => {
              e.preventDefault()
              setUrl(e.target.value)
            }}
          />
          <input
            type='submit'
            value='Save'
          />
        </form>
      </div>
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
          />
        ))}
      </div>
    </>
  )
}
export default App
