const routeControl = require('express').Router()
const Blog = require('../models/blog')

routeControl.get('/', (request, response) => {
    console.log('GET')
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
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
