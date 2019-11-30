/* eslint-disable no-undef */
const app = require('../app')
const mongoose = require('mongoose')
const User = require('../models/userModel')
const supertest = require('supertest')

//Necesitas el suepertest para poder testear la app completa
const api = supertest(app)

//Operaciones antes de los tests

beforeEach(async()=>{
  await User.deleteMany({})
  let newUser = new User({
    username:'albertofcasuso',
    email:'albertofcasuso@gmail.com',
    password:'123456'
  })
  await newUser.save()
})


describe('users API tests',()=>{

  test('Valid users can be added', async()=>{
    const newUser = {
      username:'manana',
      email:'manana@gmail.com',
      password:'123456'
    }

    await api.post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type',/application\/json/)
  })

  test('Invalid usernames can not be created',async()=>{
    const invalidUser = {
      username:'m',
      email:'someemail@gmail.com',
      password:'1234334'
    }
    await api.post('/api/users')
      .send(invalidUser)
      .expect(400)
  })
  
  test('Invalid passwords can not be created',async()=>{
    const invalidPassword = {
      username:'mazdey',
      email:'mazdey@gmail.com',
      password:'1'
    }
    await api.post('/api/users')
      .send(invalidPassword)
      .expect(400)
  })
})

afterAll(async () => {
  await User.deleteMany({})
  mongoose.connection.close()
})