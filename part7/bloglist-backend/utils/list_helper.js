//Devuelve 1 SI EXISTE POSTS
const dummy = (posts) => {
  if(posts){
    return 1
  }
}

//TOTAL LIKES
const totalLikes = (posts) => {
  const reducer = (accumulator, currentValue) => accumulator + currentValue
  const likeArray = posts.map(post=>post.likes)
  return likeArray.reduce(reducer)
}

//FAVOURITE BLOG
const favouriteBlog = (posts) =>{
  const reducer = (accumulator,currentValue) => currentValue.likes>accumulator.likes?currentValue:accumulator
  return posts.reduce(reducer)
}

//MOST BLOGS 
//VOLVER DESPUES
/*
const mostBlogs = (posts) => {
}
*/

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog
  //mostBlogs
}