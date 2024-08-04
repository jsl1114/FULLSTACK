import { useDispatch } from 'react-redux'
import { createNew } from '../reducers/anecdoteReducer'
import { changeNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const createAnecdote = async (e) => {
    e.preventDefault()
    const content = e.target.content.value
    e.target.content.value = ''
    dispatch(createNew(content))
    dispatch(changeNotification(`You created anecdote ${content}`))
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={createAnecdote}>
        <input
          type='text'
          name='content'
        />
        <button type='submit'>Add!</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
