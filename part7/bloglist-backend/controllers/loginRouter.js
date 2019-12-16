const loginRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/userModel')

loginRouter.post('/', async (request, response,next) => {
  const body = request.body
  const username = body.username
  const password = body.password
  //Busca el usuario en la DB
  const user = await User.findOne({username:username})
  const passwordCorrect = user===null?false:await bcrypt.compare(password, user.passwordHash)

  if(!(user && passwordCorrect)){
    return response.status(401).json({error:'user or password invalid'})
  }
  const userForToken = {
    username:user.username,
    id:user._id,
  }
  const token = jwt.sign(userForToken,process.env.SECRET)
  response.status(200).send({token,username:user.username,email:user.email})
})

module.exports = loginRouter