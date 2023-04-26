const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')

const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})
  console.log('cleared')

  for (let blog of helper.listWithMultipleBlogs) {
    let newBlog = new Blog(blog)
    await newBlog.save()
  }
})

test('reuturns the correct amunt of blogs in json', async () => {
  const res = await api.get('/api/blogs')
  expect(res.body).toHaveLength(helper.listWithMultipleBlogs.length)
})

test('verifies the naming of the unique identifer property (id)', async () => {
  const all = await helper.blogsInDb()
  all.forEach((b) => {
    expect(b.id).toBeDefined()
  })
})

test('can add a new valid post', async () => {
  const newBlog = new Blog(helper.listWithOneBlog[0])
  await api
    .post('/api/blogs')
    .send(newBlog)
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

afterAll(async () => {
  await mongoose.connection.close() //Disconnect from server
})
