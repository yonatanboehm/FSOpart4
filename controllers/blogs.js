const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
})
  
blogsRouter.post('/', async (request, response) => {
    const blog = new Blog(request.body)
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