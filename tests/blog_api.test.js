const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('../utils/list_helper')
const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})

  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
}, 100000)

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('blogs id is defined', async () => {
  const response = await api.get('/api/blogs')
  console.log(response)
  response.body.map(blog => expect(blog.id).toBeDefined())
})

test('a valid blog can be added', async () => {
  const newBlog = {
    title: "Twitter shinanigans",
    author: "Elon Musk",
    url: "https://x.com"
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
  
  const titles = blogsAtEnd.map(b => b.title)
  expect(titles).toContain(
    'Twitter shinanigans'
  )
}, 100000)

test('a blog with no like is assigned 0 likes', async () => {
  const newBlog = {
    title: "My story",
    author: "Barack Obama",
    url: "https://barackobama.com"
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const addedBlog = await Blog.find({ title: 'My story'}) // returns list
  expect(addedBlog[0].likes).toBe(0)
}, 100000)

afterAll(async () => {
  await mongoose.connection.close()
}, 100000)