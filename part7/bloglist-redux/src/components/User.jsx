import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const User = () => {
  const users = useSelector((state) => state.users)
  const id = useParams().id
  const user = users.find((u) => u.id === id)

  if (!user) {
    return null
  }

  return (
    <div>
      <h1>{user.name}</h1>
      <h2>Added Blogs</h2>
      <ul>
        {user.blogs.map((b) => (
          <li key={b.id}>
            <a href={`/blogs/${b.id}`}>{b.title}</a> (
            <a
              href={b.url}
              target='blank'
            >
              {b.url}
            </a>
            )
          </li>
        ))}
      </ul>
    </div>
  )
}
export default User
