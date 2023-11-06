import { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ onSave }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleSave = (e) => {
    e.preventDefault()
    const newBlog = {
      title: title,
      author: author,
      url: url,
      likes: 0,
      id: null,
    }

    onSave(newBlog)
    setAuthor('')
    setTitle('')
    setUrl('')
  }

  return (
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
          placeholder='enter title here'
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
          placeholder='enter author here'
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
          placeholder='enter url here'
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
  )
}

BlogForm.propTypes = {
  onSave: PropTypes.func.isRequired,
}

export default BlogForm
