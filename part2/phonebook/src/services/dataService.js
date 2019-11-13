import axios from 'axios'
const baseURL = 'http://localhost:3001/persons'

const fetchData = () => {
  const request = axios.get(baseURL).then(response => response.data)
  return request
}

const postData = (newObject) => {
  return axios.post(baseURL,newObject)
}

const deleteData = (id) => {
  return axios
  .delete(`http://localhost:3001/persons/${id}`)
    .then(response=>response.data)
}

export default {
  fetchData,
  postData,
  deleteData
}
