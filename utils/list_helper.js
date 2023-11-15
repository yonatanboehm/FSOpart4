const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  likesArr = blogs.map(blog => blog.likes)
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

module.exports = {
  dummy, totalLikes, mostLikes
}
