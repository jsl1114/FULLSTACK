import { useQuery } from '@apollo/client'
import { ALL_BOOKS_EXCEPT_GENRE } from '../queries'

const Books = (props) => {
  const res = useQuery(ALL_BOOKS_EXCEPT_GENRE)

  if (!props.show) {
    return null
  }

  if (res.loading) {
    return <div>loading...</div>
  }

  const books = res.data.allBooks

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Books
