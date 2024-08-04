/* eslint-disable react/prop-types */
import { useSelector, useDispatch } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { changeNotification } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote, handleClick }) => {
  return (
    <div key={anecdote.id}>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={handleClick}>vote</button>
      </div>
    </div>
  )
}

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector((state) => {
    return state.anecdotes.filter((a) =>
      a.content.toLowerCase().includes(state.filter.toLowerCase())
    )
  })

  const vote = (id) => {
    dispatch(addVote(id))
    dispatch(
      changeNotification(
        `you voted "${anecdotes.filter((a) => a.id === id)[0].content}"`
      )
    )
  }

  return (
    <div>
      {[...anecdotes]
        .sort((a, b) => b.votes - a.votes)
        .map((a) => (
          <Anecdote
            key={a.id}
            anecdote={a}
            handleClick={() => vote(a.id)}
          />
        ))}
    </div>
  )
}

export default AnecdoteList
