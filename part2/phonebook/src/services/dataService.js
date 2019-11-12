import axios from 'axios'
const baseURL = 'http://localhost:3001/persons'

const fetchData = () => {
  const request = axios.get(baseURL).then(response => response.data)
  return request
}

const postData = (newObject) => {
  return axios.post(baseURL,newObject)
}

const updateData = () => {

}

export default {
  fetchData,
  postData,
  updateData
}
