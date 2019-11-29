const routeControl = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/userModel')

routeControl.post('/', async (request, response,next) => {
  try{
    const body = request.body
    const saltRounds = 10
    const hash = await bcrypt.hash(body.password,saltRounds)
    const user = new User({
      username: body.username,
      email:body.email,
      passwordHash: hash,
    })

    const result =  await user.save()
    response.status(201).json(result.toJSON())
  }catch(error){
    next(error)
  }
})

routeControl.get('/', async (request, response,next) => {
  try{
    const users = await User.find({})
    response.status(200).json(users.map(user=>user.toJSON()))
  }catch(error){
    next(error)
  }
})
module.exports = routeControl