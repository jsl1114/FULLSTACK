/* eslint-disable react/no-unescaped-entities */

const Recommendations = ({ show, me, books }) => {
  if (!show) {
    return null
  }

  if (me.loading || books.loading) {
    return <div>loading...</div>
  }

  const user = me.data.me
  const allBooks = books.data.allBooks

  return (
    <div>
      {user.username}'s favorite genre: {user.favoriteGenre}, and here are some
      recommendations based on your fav genre:
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
            <th>genres</th>
          </tr>
          {allBooks
            .filter((b) => b.genres.includes(user.favoriteGenre))
            .map((b) => (
              <tr key={b.title}>
                <td>{b.title}</td>
                <td>{b.author.name}</td>
                <td>{b.published}</td>
                {b.genres.map((g, i) => (
                  <td key={`${b.title}-${b.genres[i]}`}>{b.genres[i]}</td>
                ))}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}
export default Recommendations
