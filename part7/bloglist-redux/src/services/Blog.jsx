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
  return request
    .then((response) => response.data)
    .catch((err) => {
      window.alert(err.message, `${err.message}, log in again.`)
      window.localStorage.removeItem(`loggedBlogappUser`)
      window.location.reload()
    })
}

const update = (id, newObj) => {
  return axios.put(`${baseUrl}/${id}`, newObj)
}

const remove = (id) => {
  const config = {
    headers: { Authorization: token },
  }
  return axios.delete(`${baseUrl}/${id}`, config).catch((err) => {
    window.alert(err.message, `${err.message}, log in again.`)
    window.localStorage.removeItem(`loggedBlogappUser`)
    window.location.reload()
  })
}

const postComment = (id, content) => {
  return axios.post(`${baseUrl}/${id}/comments`, { content })
}

const exportedObj = {
  getAll,
  create,
  update,
  remove,
  setToken,
  postComment,
}

export default exportedObj
