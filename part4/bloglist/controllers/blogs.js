const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs)
  })
})

blogsRouter.post('/', (request, response, next) => {
  const blog = new Blog(request.body)

  blog.save().then((result) => {
    response.status(201).json(result)
  })
  .catch(err => next(err))
})

blogsRouter.delete('/:id', (req, res, next) => {
  Blog.findByIdAndRemove(req.params.id)
    .then(() => {
      res.status(204).end()
    })
    .catch((err) => next(err))
})

// blogsRouter.put(`/:id`, (req, res, next) => {
//   const body = req.body

//   const updatedBlog = {

//   }
// })

module.exports = blogsRouter
