/* eslint-disable no-undef */
const app = require('../app')
const mongoose = require('mongoose')
const Blog = require('../models/blog')
const supertest = require('supertest')

//Necesitas el suepertest para poder testear la app completa
const api = supertest(app)

//dummy data
const post = [
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
  },
  {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12
  },
  {
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10
  },
  {
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0
  },
  {
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2
  }
]

//Operaciones antes de los tests, borrar datos existentes y cargas nuevos datos
beforeEach(async()=>{
  await Blog.deleteMany({})
  let noteObject = new Blog(post[0])
  await noteObject.save()
  noteObject = new Blog(post[1])
  await noteObject.save()
  noteObject = new Blog(post[2])
  await noteObject.save()
  noteObject = new Blog(post[3])
  await noteObject.save()
  noteObject = new Blog(post[4])
  await noteObject.save()
  noteObject = new Blog(post[5])
  await noteObject.save()
})

describe('API GET tests',()=>{

  test('Blogs can be retrieved - GET', async ()=>{
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('length is 6',async()=>{
    const response = await api.get('/api/blogs')
    expect(response.body.length).toBe(6)
  })


  test('id property is defined', async()=>{
    const response = await api.get('/api/blogs')
    const blogs = response.body.map(r=>r)
    expect(blogs.map(blog=>blog.id)).toBeDefined()
  })

})

describe('API POST tests',()=>{

  test('Blog can be POSTed', async ()=>{
    const newPost = {
      title: 'Socialist economics',
      author: 'Donald Trump',
      url: 'https://donaldtrumpthecommunist.com',
      likes: 7
    }
    const previousResponse = await api.get('/api/blogs')

    await api
      .post('/api/blogs')
      .send(newPost)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    expect(response.body.length).toBe(previousResponse.body.length+1)
  })

  test('likes default is 0',async()=>{
    const newPost = {
      title: 'Socialist economics',
      author: 'Donald Trump',
      url: 'https://donaldtrumpthecommunist.com'
    }

    await api
      .post('/api/blogs')
      .send(newPost)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    const response = await api.get('/api/blogs')
    const lastPost = response.body.map(blog=>blog)
    expect(lastPost[lastPost.length-1].likes).toBe(0)
  })

  test('Error 400 if title and url missing', async()=>{
    const newPost = {
      author: 'Donald Trump'
    }

    await api
      .post('/api/blogs')
      .send(newPost)
      .expect(400)
      .expect('Content-Type', /application\/json/)
  })

})

afterAll(async () => {
  //await Blog.deleteMany({})
  mongoose.connection.close()
})