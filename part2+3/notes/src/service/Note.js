import axios from 'axios'
const baseUrl = '/api/notes'

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const req = axios.get(baseUrl)
  return req.then((res) => {
    return res.data
  })
}

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  }
  const res = await axios.post(baseUrl, newObject, config)
  return res.data
}

const update = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject)
}

const remove = (id) => {
  return axios.delete(`${baseUrl}/${id}`)
}

const exportedObj = {
  getAll,
  create,
  update,
  remove,
  setToken
}

export default exportedObj
