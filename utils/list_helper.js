const _ = require('lodash')
const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const likesArr = blogs.map(blog => blog.likes)
  return likesArr.reduce((x,y) => x+y, 0)
}

const mostLikes = (blogs) => {
  const likesCount = Math.max(...blogs.map(blog => blog.likes))
  const mostLikedBlog = blogs.find(blog => blog.likes === likesCount)
  return {
    title: mostLikedBlog.title,
    author: mostLikedBlog.author,
    likes: mostLikedBlog.likes
  }
  
}

const authorMostBlogs = (blogs) => {
  const blogsByAuthor = _.countBy(blogs.map(blog => blog.author)) // count occurances of authors in author array // return author name with maximum value
  mostBlogs = Math.max(...Object.values(blogsByAuthor))
  authorMax = Object.keys(blogsByAuthor).find(author => blogsByAuthor[author] === mostBlogs)
  return {
    author: authorMax,
    blogs: mostBlogs
  }
}

module.exports = {
  dummy, totalLikes, mostLikes, authorMostBlogs
}
