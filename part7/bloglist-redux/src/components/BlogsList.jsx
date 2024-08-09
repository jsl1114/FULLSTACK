import { useSelector, useDispatch } from 'react-redux'
import blogService from '../services/Blog'
import Blog from './Blog'
import { setBlogs } from '../reducers/blogsReducer'
import { changeNotification } from '../reducers/notificationReducer'

const BlogsList = ({ user }) => {
  const blogs = useSelector((state) => state.blogs)
  const dispatch = useDispatch()

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

  const handleDelete = (id) => {
    if (
      window.confirm(`Remove blog ${blogs.filter((b) => b.id === id)[0].title}`)
    )
      blogService
        .remove(id)
        .then(() => dispatch(setBlogs(blogs.filter((b) => b.id !== id))))
  }

  return (
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
          id={blog.id}
          likes={blog.likes}
          handleLike={() => handleLike(blog.id)}
          handleDelete={() => handleDelete(blog.id)}
          user={user.name}
        />
      ))}
    </div>
  )
}

export default BlogsList
