import axios from 'axios'
const baseUrl = 'api/blogs'

const getAll = async () => {
  try{
    const blogs = await axios.get(baseUrl)
    return blogs.data
  }catch(error){
    console.log('error', error.message)
  }
}

export default { getAll }