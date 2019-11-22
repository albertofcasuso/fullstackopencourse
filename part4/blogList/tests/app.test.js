/* eslint-disable no-undef */
const app = require('../app')
const mongoose = require('mongoose')
const supertest = require('supertest')
//Necesitas el suepertest para poder testear la app completa
const api = supertest(app)

describe('API tests',()=>{
  test('Blogs can be retrieved - GET', async ()=>{
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
})

afterAll(() => {
  mongoose.connection.close()
})