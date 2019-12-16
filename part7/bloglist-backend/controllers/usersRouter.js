const routeControl = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/userModel')

routeControl.post('/', async (request, response,next) => {
  const body = request.body
  if(body.password.length > 3){
    try{
      const saltRounds = 10
      const hash = await bcrypt.hash(body.password,saltRounds)
      const user = new User({
        username: body.username,
        email:body.email,
        passwordHash: hash,
      })

      const result =  await user.save()
      response.status(200).json(result.toJSON())
    }catch(error){
      next(error)
    }}
  else{
    response.status(400).json({error:'password invalid. Must contain more than three characters.'})
  }
})

routeControl.get('/', async (request, response,next) => {
  try{
    const users = await User.find({}).populate('blogs',{likes:1,title:1,author:1,url:1})

    response.status(200).json(users.map(user=>user.toJSON()))
  }catch(error){
    next(error)
  }
})
module.exports = routeControl