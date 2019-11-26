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


routeControl.delete('/:id',async(request,response,next)=>{
  try{
    const deleted = await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  }catch(error){
    console.log('deleting error')
  }
})

routeControl.put('/:id',async(request,response,next)=>{
  const body = request.body

  const blog = {
    title:body.title,
    author:body.author,
    url:body.url,
    likes:body.likes
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id,blog,{new:true})
  response.json(updatedBlog.toJSON())

})

module.exports = routeControl
