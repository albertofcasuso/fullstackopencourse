const routeControl = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/userModel')


routeControl.get('/',async (request, response,next) => {

  try{
    const blogs = await Blog.find({}).populate('user',{username:1,email:1})
    response.json(blogs.map(blog=>blog.toJSON()))
  }catch(error){
    next(error)
  }
})

routeControl.post('/', async (request, response,next) => {
  const body = request.body
  const user = await User.findById(body.userID)

  const blog = new Blog({
    title:body.title,
    author:body.author,
    likes:body.likes,
    url:body.url,
    user:user._id,
  })
  

  try{
    const decodedToken = jwt.verify(request.token,process.env.SECRET)

    if(!request.token || !decodedToken.id){
      return response.status(401).json({error:'token missing or invalid'})
    }
    const savedBlog =  await blog.save()
    user.blogs=user.blogs.concat(savedBlog._id)
    await user.save()
    response.json(savedBlog.toJSON())
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
