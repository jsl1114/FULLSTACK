const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')

const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})

  for (let blog of helper.listWithMultipleBlogs) {
    let newBlog = new Blog(blog)
    await newBlog.save()
  }
  console.log('resetted')
})

test('returns the correct amount of blogs in json', async () => {
  const res = await api.get('/api/blogs')
  expect(res.body).toHaveLength(helper.listWithMultipleBlogs.length)
})

test('verifies the naming of the unique identifer property (id)', async () => {
  const all = await helper.blogsInDb()
  all.forEach((b) => {
    expect(b.id).toBeDefined()
  })
})

test('can add a new valid post from a registered user', async () => {
  const credentials = {
    "username":"ljsadmin2",
    "name":"Jason Liu",
    "password":"ljsss"
  }
  const loginRes = await api
    .post('/api/login')
    .send(credentials)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const token = loginRes.token

  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(helper.listWithOneBlog[0])
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const afterAdd = await helper.blogsInDb()

  expect(afterAdd).toHaveLength(helper.listWithMultipleBlogs.length + 1)
})

test('request contains like property', async () => {
  expect(helper.listWithOneBlog[0].likes).toBeDefined()
})

test('blogs missing a title or url get responded with 400', async () => {
  const blogWotitle = {
    author: 'sample',
    url: 'sample.com',
    likes: 3,
  }

  await api.post('/api/blogs').send(blogWotitle).expect(400)
})

describe('DELETE', () => {
  test('A valid blog can be deleted', async () => {
    const blogs = await helper.blogsInDb()
    const blogToDelete = blogs[0]
    console.log('deleting', blogToDelete.title)
    const credentials = {
      "username":"ljsadmin2",
      "name":"Jason Liu",
      "password":"ljsss"
    }
    const loginRes = await api.post('/api/login').send(credentials).expect(200)

    await api.delete(`/api/blogs/${blogToDelete.id}`).set('Authorization', `Bearer `).expect(204)
    const afterDelete = await helper.blogsInDb()
    expect(afterDelete).toHaveLength(blogs.length - 1)
  })
})

describe('PUT', () => {
  test('A blog can be updated', async () => {
    const blogs = await helper.blogsInDb()
    const blogToupdate = blogs[0]
    const updatedBlog = {
      title: 'Updated',
      author: 'JINSEN',
      url: 'nicai.com',
      likes: blogToupdate.likes,
    }
    const updatedDB = await api
      .put(`/api/blogs/${blogToupdate.id}`)
      .send(updatedBlog)
    expect(updatedDB.body.title).toEqual(updatedBlog.title)
    expect(updatedDB.body.title).not.toEqual(blogToupdate.title)
  })
})

afterAll(async () => {
  await mongoose.connection.close() //Disconnect from server
})
