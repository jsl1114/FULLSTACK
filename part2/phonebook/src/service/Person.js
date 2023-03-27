import axios from 'axios'
const baseUrl = 'https://noteappjs.fly.dev/api/persons'

const getAll = () => {
  const req =  axios.get(baseUrl)
  return req.then( res => {
    return res.data
  })
}

const create = newObject => {
  return axios.post(baseUrl, newObject)
}

const update = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject)
}

const remove = id => {
  return axios.delete(`${baseUrl}/${id}`)
}

export default { 
  getAll,
  create,
  update,
  remove
}