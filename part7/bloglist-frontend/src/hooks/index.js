import {useState} from 'react'
import axios from 'axios'
const baseUrl = 'api/blogs'

export const useField = (type) =>{
    const [value, setValue] = useState('')

    const onChange = (event) =>{
        setValue(event.target.value)
    }

    const reset = () =>{
        setValue('')
    }

    return {
        type,value,onChange,reset
    }
}

export const useResource = () =>{
    let token = null

    const getAll = async () =>{
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

    return {
        getAll, postBlog
    }
}