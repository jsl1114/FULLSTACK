const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const { userExtractor, tokenExtractor } = require('../utils/middleware')

const getTokenFrom = (req) => {
  const auth = req.get('Authorization')
  if (auth && auth.startsWith('Bearer ')) {
    const token = auth.replace('Bearer ', '')
    return token
  }
  return null
}

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.post('/', tokenExtractor, async (request, response) => {
  const body = request.body

  const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)

  if (!decodedToken.id) {
    response.status(401).json({ error: 'Invalid Token' })
  }

  const user = await User.findById(decodedToken.id)

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    user: user.id || null,
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.json(savedBlog.toJSON())
})

blogsRouter.delete('/all', async (req, res) => {
  await Blog.deleteMany({})
  res.json({ msg: 'cleared' })
})

blogsRouter.delete('/:id', userExtractor, async (req, res) => {
  const user = req.user
  const removedBlog = await Blog.findByIdAndRemove(req.params.id)
  user.blogs = user.blogs.filter(
    (b) => b.toString() !== removedBlog.id.toString()
  )

  await user.save()

  res.status(204).end()
})

blogsRouter.put(`/:id`, async (req, res) => {
  const { title, author, url, likes } = req.body

  const updatedBlog = await Blog.findByIdAndUpdate(
    req.params.id,
    { title, author, url, likes },
    { new: true, runValidators: true, context: 'query' }
  )
  res.json(updatedBlog)
})

blogsRouter.post(`/:id/comments`, async (req, res) => {
  const body = req.body

  console.log(JSON.stringify(body))

  let blogToPostTo = await Blog.findById(req.params.id)

  blogToPostTo.comments.push(body.content)

  const saved = await blogToPostTo.save()

  res.json(saved)
})

module.exports = blogsRouter
