import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (t) => {
  token = `Bearer ${t}`
  console.log(`token set: ${token}`)
}

const getAll = () => {
  const req = axios.get(baseUrl)
  return req.then((res) => {
    return res.data
  })
}

const create = (newObject) => {
  const config = {
    headers: { Authorization: token },
  }
  const request = axios.post(baseUrl, newObject, config)
  return request.then((response) => response.data)
}

const update = (id, newObj) => {
  return axios.put(`${baseUrl}/${id}`, newObj)
}

const remove = (id) => {
  const config = {
    headers: { Authorization: token },
  }
  return axios.delete(`${baseUrl}/${id}`, config)
}

const exportedObj = {
  getAll,
  create,
  update,
  remove,
  setToken,
}

export default exportedObj
