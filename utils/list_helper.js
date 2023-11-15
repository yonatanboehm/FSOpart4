const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  likesArr = blogs.map(blog => blog.likes)
  return likesArr.reduce((x,y) => x+y, 0)
}

module.exports = {
  dummy, totalLikes
}
