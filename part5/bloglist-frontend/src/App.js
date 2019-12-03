import React,{useState,useEffect} from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import LogoutForm from './components/LogoutForm'
import InputForm from './components/InputForm'
import Notification from './components/Notification'

//import logo from './logo.svg';
import './App.css';

const App = () => {
/*==============STATE CONSTANTS=====================================================*/
  const [blogs,setBlogs] = useState([])

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user,setUser] = useState(null)

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const [errorMessage, setErrorMessage] = useState(null)

/*==============CHECK LOGIN=====================================================*/
const checkLogin=()=>{
  const loggedUser = window.localStorage.getItem('loggedUser')
  if(loggedUser){
    const user = JSON.parse(loggedUser)
    setUser(user)
    setErrorMessage(`Welcome back ${user.username}`)
    setTimeout(() => {setErrorMessage(null)}, 3000)
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
      setErrorMessage(`Welcome ${user.username}`)
      setTimeout(() => {setErrorMessage(null)}, 3000)
    }catch(error){
      setErrorMessage(`Incorrect login`)
      setTimeout(() => {setErrorMessage(null)}, 3000)
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
    setErrorMessage(`New blog added: Title:${response.title}`)
    setTimeout(() => {setErrorMessage(null)}, 3000)
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
        <Notification message={errorMessage}/>
        <InputForm handleInput={handleInput} title={title} setTitle={handleTitle} author={author} setAuthor={handleAuthor} url={url} setUrl={handleUrl}/>
        <Blog user={user.username} blogs={blogs}/>
      </div>
      :
      <div>
        <Notification message={errorMessage}/>
        <LoginForm username={username} password={password} setUsername={handleUsername} setPassword={handlePassword} handleLogin={handleLogin}/>
      </div>
      }
    </div>
  )
}

export default App
