import { useState } from 'react'
import { useApolloClient, useQuery } from '@apollo/client'

import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Recommendations from './components/Recommendations'
import { ALL_AUTHORS, ALL_BOOKS, ME } from './queries'

const App = () => {
  const [page, setPage] = useState('books')
  const [token, setToken] = useState(null)
  const client = useApolloClient()
  const authors = useQuery(ALL_AUTHORS)
  const books = useQuery(ALL_BOOKS)
  const user = useQuery(ME)

  if (authors.loading || books.loading || user.loading) {
    return <div>loading...</div>
  }

  const logout = () => {
    localStorage.clear()
    setToken(null)
    client.resetStore()
    setPage('authors')
  }

  if (!token) {
    return (
      <div>
        <div>
          <button onClick={() => setPage('authors')}>authors</button>
          <button onClick={() => setPage('books')}>books</button>
          <button onClick={() => setPage('login')}>login</button>
        </div>

        <Authors
          show={page === 'authors'}
          token={false}
          authors={authors}
        />

        <Books show={page === 'books'} />

        <LoginForm
          show={page === 'login'}
          setToken={setToken}
          setPage={setPage}
          user={user}
        />
      </div>
    )
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
        <button onClick={() => setPage('rec')}>recommendations</button>
        <button onClick={logout}>logout</button>
      </div>

      <Authors
        show={page === 'authors'}
        token={true}
        authors={authors}
      />

      <Books show={page === 'books'} />

      <NewBook
        show={page === 'add'}
        setPage={setPage}
      />

      <Recommendations
        show={page === 'rec'}
        me={user}
      />
    </div>
  )
}

export default App
