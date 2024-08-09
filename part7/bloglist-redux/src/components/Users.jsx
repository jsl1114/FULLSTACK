import axios from 'axios'
import { useState, useEffect } from 'react'

const Users = () => {
  const [allUsers, setAllUsers] = useState([])

  useEffect(() => {
    axios.get('/api/users').then((res) => setAllUsers(res.data))
  }, [])

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>User</th>
            <th>Blogs created</th>
          </tr>
        </thead>
        <tbody>
          {allUsers.map((user) => (
            <tr key={user.id}>
              <td>
                <a href={`/users/${user.id}`}>
                  {user.name} ({user.username})
                </a>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
export default Users
