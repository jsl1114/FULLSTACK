import Toggleable from './Toggleable'
import BlogsList from './BlogsList'
import BlogForm from './BlogForm'
import blogService from '../services/Blog'

import { useSelector, useDispatch } from 'react-redux'
import { appendBlog } from '../reducers/blogsReducer'
import { changeNotification } from '../reducers/notificationReducer'

const MainScreen = ({ blogFormRef }) => {
  const user = useSelector((s) => s.user)
  const dispatch = useDispatch()

  const handleSave = (newBlog) => {
    blogFormRef.current.toggleVisibility()
    blogService.create(newBlog).then((res) => {
      dispatch(appendBlog(newBlog))
      dispatch(changeNotification(`New blog ${newBlog.title} saved.`))
    })
  }
  return (
    <>
      <Toggleable
        buttonLabel={'Add new blog'}
        ref={blogFormRef}
      >
        <BlogForm onSave={handleSave} />
      </Toggleable>

      <BlogsList user={user} />
    </>
  )
}
export default MainScreen
