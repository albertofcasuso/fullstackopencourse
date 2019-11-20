const dummy = (blogs) => {
  if(blogs){
    return 1
  }
}

//TOTAL LIKES
const totalLikes = (posts) => {
  const reducer = (accumulator, currentValue) => accumulator + currentValue
  const likeArray = posts.map(post=>post.likes)
  return likeArray.reduce(reducer)
}
  
module.exports = {
  dummy,
  totalLikes
}