const routeControl = require('express').Router()
const Blog = require('../models/blog')

routeControl.get('/',async (request, response,next) => {

  try{
    const blogs = await Blog.find({})
    response.json(blogs.map(blog=>blog.toJSON()))
  }catch(error){
    next(error)
  }
})

routeControl.post('/', async (request, response,next) => {
  const blog = new Blog(request.body)

  try{
    const result =  await blog.save()
    response.status(201).json(result.toJSON())
  }catch(error){
    next(error)
  }
})

module.exports = routeControl
