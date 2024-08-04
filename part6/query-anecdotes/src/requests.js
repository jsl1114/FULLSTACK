import axios from 'axios'

const baseUrl = 'http://localhost:3002/anecdotes'

export const getAnecdotes = () => {
  return axios.get(baseUrl).then((res) => res.data)
}

export const addAnecdote = (anecdote) => {
  return axios.post(baseUrl, anecdote).then((res) => res.data)
}

export const voteAnecdote = (anecdote) => {
  return axios
    .put(`${baseUrl}/${anecdote.id}`, {
      ...anecdote,
      votes: anecdote.votes + 1,
    })
    .then((res) => res.data)
}
