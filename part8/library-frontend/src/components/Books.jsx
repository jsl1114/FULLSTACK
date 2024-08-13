import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'
import { useState } from 'react'

const Books = (props) => {
  const [genre, setGenre] = useState('')
  const res = useQuery(ALL_BOOKS, { variables: { genre } })

  if (!props.show) {
    return null
  }

  if (res.loading) {
    return <div>loading...</div>
  }

  const books = res.data.allBooks

  const genresArray = [...new Set(books.flatMap((b) => b.genres))]

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
            <th>genres</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
              {a.genres.map((g, i) => (
                <td key={`${a.title}-${a.genres[i]}`}>{a.genres[i]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        {genresArray.map((genre) => (
          <button
            key={genre}
            onClick={() => setGenre(genre)}
          >
            {genre}
          </button>
        ))}
        <button onClick={() => setGenre('')}>All</button>
      </div>
    </div>
  )
}

export default Books
