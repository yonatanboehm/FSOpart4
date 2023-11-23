const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user')
  response.json(blogs)
})
  
blogsRouter.post('/', async (request, response) => {
    const body = request.body

    const users = await User.find({})
    users.map(user => user.toJSON())
    const user = users[Math.floor(Math.random() * users.length)]
    const blog = new Blog({
      url: body?.url,
      title: body?.title,
      author: body?.author,
      user: user?.id,
      likes: body?.likes
    })
    console.log(blog)
    if (!blog.likes){
        blog.likes = 0
    }
    if (blog.url && blog.title){
      const result = await blog.save()
      response.status(201).json(result)
    } else {
      response.status(400).end()
    }
})

blogsRouter.delete('/:id', async (request, response) =>{
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => { // add 1 like
  const blog = await Blog.findById(request.params.id)
  blog.likes++
  const result = await Blog.findByIdAndUpdate(request.params.id, blog.toJSON(), { new: true })
  response.json(result)
})

module.exports = blogsRouter