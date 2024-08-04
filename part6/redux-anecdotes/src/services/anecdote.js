import axios from 'axios'

const baseUrl = 'http://localhost:5174/anecdotes'

const getAll = async () => {
  const res = await axios.get(baseUrl)
  return res.data
}

const createNew = async (content) => {
  const obj = { content, votes: 0 }
  const res = await axios.post(baseUrl, obj)
  return res.data
}

const addVote = async (id) => {
  const anecdotes = await getAll()
  const target = anecdotes.find((a) => a.id === id)
  const changedAnecdote = { ...target, votes: target.votes + 1 }
  await axios.put(baseUrl + '/' + id, changedAnecdote)
  return anecdotes.map((a) => (a.id === id ? changedAnecdote : a))
}

export default {
  getAll,
  createNew,
  addVote,
}
