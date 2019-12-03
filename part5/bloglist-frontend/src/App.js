import React,{useState,useEffect} from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import LogoutForm from './components/LogoutForm'
import InputForm from './components/InputForm'

//import logo from './logo.svg';
//import './App.css';

const App = () => {
/*==============STATE CONSTANTS=====================================================*/
  const [blogs,setBlogs] = useState([])

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user,setUser] = useState(null)

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

/*==============CHECK LOGIN=====================================================*/
const checkLogin=()=>{
  const loggedUser = window.localStorage.getItem('loggedUser')
  if(loggedUser){
    const user = JSON.parse(loggedUser)
    setUser(user)
  }
}
useEffect(checkLogin,[])

/*==============FIRST DATA FETCH
=====================================================*/
  const fetchData = () =>{
    blogService.getAll().then(blog=> setBlogs(blog))
  }
  useEffect(fetchData,[])

/*==============LOGIN FORM HANDLERS====================================================*/
  const handleLogin = async (event)=>{
    event.preventDefault()
    try{
      const user = await loginService.login({username,password})
      window.localStorage.setItem('loggedUser',JSON.stringify(user))
      setUser(user)
      setUsername('')
      setPassword('')
    }catch(error){
      console.log('error', error.message)
    }
  }
  const handleUsername = (event) => {
    setUsername(event.target.value)
  }
  const handlePassword = (event) => {
    setPassword(event.target.value)
  }
/*==============INPUT HANDLERS=====================================================*/
const handleInput = async (event) =>{
  event.preventDefault()
  const newBlog = {
    title:title,
    author:author,
    url:url
  }
  try{
    const response = await blogService.postBlog(newBlog,user.token)
    setBlogs(blogs.concat(response))
  }catch(error){
    console.log('error', error.message)
  }
}


const handleTitle = (event) => {
    setTitle(event.target.value)
  }
const handleAuthor = (event) => {
    setAuthor(event.target.value)
  }
const handleUrl = (event) => {
    setUrl(event.target.value)
  }
/*=================================================================================*/
  return (
    <div>
      { user!==null?
      <div>
        <LogoutForm user={user.username}/>
        <InputForm handleInput={handleInput} title={title} setTitle={handleTitle} author={author} setAuthor={handleAuthor} url={url} setUrl={handleUrl}/>
        <Blog user={user.username} blogs={blogs}/>
      </div>
      :
      <LoginForm username={username} password={password} setUsername={handleUsername} setPassword={handlePassword} handleLogin={handleLogin}/>
      }
    </div>
  )
}

export default App
