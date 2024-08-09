import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

import blogService from '../services/Blog'
import { useDispatch } from 'react-redux'
import { setBlogs } from '../reducers/blogsReducer'
import { changeNotification } from '../reducers/notificationReducer'
import { useState } from 'react'

const BlogPage = () => {
  const id = useParams().id
  const blogs = useSelector((state) => state.blogs)
  const blog = blogs.find((b) => b.id === id)
  const [commentInput, setCommentInput] = useState('')

  const dispatch = useDispatch()

  if (!blog) return null

  const handleLike = (id) => {
    const match = blogs.find((blog) => blog.id === id)

    blogService.update(id, { ...match, likes: match.likes + 1 }).then((res) => {
      dispatch(setBlogs(blogs.map((b) => (b.id === id ? res.data : b))))
      dispatch(
        changeNotification(
          `You liked <${blogs.find((b) => b.id === id).title}>`
        )
      )
    })
  }

  const handleCommentPost = (id, content) => {
    blogService.postComment(id, content).then((res) => {
      dispatch(setBlogs(blogs.map((b) => (b.id === id ? res.data : b))))
      setCommentInput('')
      dispatch(changeNotification(`You posted a comment <${content}>`))
    })
  }

  return (
    <div>
      <h2>
        {blog.title} By [{blog.author}]
      </h2>
      <pre>
        <a href={blog.url}>{blog.url}</a>
      </pre>
      <h2>
        {blog.likes} likes{' '}
        <button
          onClick={() => handleLike(blog.id)}
          className='viewbtn'
        >
          like
        </button>
      </h2>
      <h1>Comments</h1>
      <input
        type='text'
        placeholder='Add comment...'
        value={commentInput}
        onChange={(e) => {
          e.preventDefault()
          setCommentInput(e.target.value)
        }}
      />
      <button
        className='viewbtn'
        onClick={() => handleCommentPost(blog.id, commentInput)}
      >
        Post
      </button>
      {blog.comments.length > 0 ? (
        <ul>
          {blog.comments.map((c) => (
            <li key={`${c}${Math.random() * 32}`}>{c}</li>
          ))}
        </ul>
      ) : (
        <pre>Nothing yet...</pre>
      )}
    </div>
  )
}
export default BlogPage
