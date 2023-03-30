import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = () => {
  const req = axios.get(baseUrl)
  return req.then((res) => {
    return res.data
  })
}

const create = (newObj) => {
  return axios.post(baseUrl, newObj)
}

const update = (id, newObj) => {
  return axios.put(`${baseUrl}/${id}`, newObj)
}

const remove = (id) => {
  return axios.delete(`${baseUrl}/${id}`)
}

const exportedObj = {
  getAll,
  create,
  update,
  remove,
}

export default exportedObj
