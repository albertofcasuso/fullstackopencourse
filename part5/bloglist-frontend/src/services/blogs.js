import axios from 'axios'
const baseUrl = 'api/blogs'
let token = null

const getAll = async () => {
  try{
    const blogs = await axios.get(baseUrl)
    return blogs.data
  }catch(error){
    console.log('error', error.message)
  }
}

const postBlog = async (newBlog,newToken) => {
  token = `bearer ${newToken}`
  const config = {
    headers: {Authorization: token},
  }
  try{
    const response = await axios.post(baseUrl,newBlog,config)
    return response.data
  }catch(error){
    console.log('error', error.message)
  }
}

const likeBlog = async (likedBlog) => {
  const likedBlogUrl = `${baseUrl}/${likedBlog.id}`
  try{
    const response = await axios.put(likedBlogUrl,likedBlog)
    return response.data
  }catch(error){
    console.log('error', error.message)
  }
}

const deleteBlog = async (id,newToken) => {
  token = `bearer ${newToken}`
  const config = {
    headers: {Authorization: token},
  }
  const deletedBlogUrl = `${baseUrl}/${id}`
  try{
    const response = await axios.delete(deletedBlogUrl,config)
    return response
  }catch(error){
    console.log('error', error.message)
  }
}

export default { getAll, postBlog,likeBlog,deleteBlog }