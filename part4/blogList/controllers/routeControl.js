const routeControl = require('express').Router()
const Blog = require('../models/blog')

routeControl.get('/',async (request, response) => {
  console.log('GET')
  const blogs = await Blog.find({})
  response.json(blogs.map(blog=>blog.toJSON()))
  
})

routeControl.post('/', (request, response) => {
  console.log('POST')
  const blog = new Blog(request.body)

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
})

module.exports = routeControl
