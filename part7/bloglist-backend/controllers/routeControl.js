const routeControl = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/userModel')
const Comment = require('../models/commentModel')


routeControl.get('/',async (request, response,next) => {

  try{
    const blogs = await Blog.find({}).populate('user',{username:1,email:1}).populate('comments',{content:1})
    response.json(blogs.map(blog=>blog.toJSON()))
  }catch(error){
    next(error)
  }
})

routeControl.post('/', async (request, response,next) => {
  const body = request.body

  try{
    const decodedToken = jwt.verify(request.token,process.env.SECRET)

    if(!request.token || !decodedToken.id){
      return response.status(401).json({error:'token missing or invalid'})
    }
    const user = await User.findById(decodedToken.id)
    const blog = new Blog({
      title:body.title,
      author:body.author,
      likes:body.likes,
      url:body.url,
      user:user._id,
    })
    const savedBlog =  await blog.save()
    user.blogs=user.blogs.concat(savedBlog._id)
    await user.save()
    response.json(savedBlog.toJSON())
  }catch(error){
    next(error)
  }
})

routeControl.post('/:id/comments', async (request, response,next) => {
  const body = request.body
  const id = request.params.id
  try{
    const blog = await Blog.findById(id)
    const comment = new Comment({
      content:body.content,
      blog:blog._id
    })
    const savedComment = await comment.save()
    blog.comments = blog.comments.concat(savedComment._id)
    await blog.save()
    response.json(savedComment.toJSON())
  }catch(error){
    next(error)
}
})


routeControl.delete('/:id',async(request,response,next)=>{
  
  try{
    const blogToDelete = await Blog.findById(request.params.id)
    const decodedToken = jwt.verify(request.token,process.env.SECRET)
    const loggedUser = await User.findById(decodedToken.id)

    if(!request.token || !decodedToken.id || loggedUser.id!=blogToDelete.user){
      return response.status(401).json({error:'token missing,invalid or wrong user logged in'})
    }
    const deleted = await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  }catch(error){
    next(error)
  }
})

routeControl.put('/:id',async(request,response,next)=>{
  const body = request.body

  const blog = {
    title:body.title,
    author:body.author,
    url:body.url,
    likes:body.likes,
    user:body.user
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id,blog,{new:true})
  response.json(updatedBlog.toJSON())

})

module.exports = routeControl
