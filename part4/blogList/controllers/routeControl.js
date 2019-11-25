const routeControl = require('express').Router()
const Blog = require('../models/blog')

routeControl.get('/',async (request, response) => {

  try{
    const blogs = await Blog.find({})
    response.json(blogs.map(blog=>blog.toJSON()))
  }catch(error){
    console.log(error)
  }
})

routeControl.post('/', async (request, response) => {
  const blog = new Blog(request.body)

  try{
    const result =  await blog.save()
    response.status(201).json(result.toJSON())
  }catch(error){
    console.log(error)
  }
})

module.exports = routeControl
