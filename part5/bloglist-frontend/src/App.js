import React,{useState,useEffect} from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import LogoutForm from './components/LogoutForm'

//import logo from './logo.svg';
//import './App.css';

const App = () => {
  const [blogs,setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user,setUser] = useState(null)

/*==============CHECK LOGIN=====================================================*/
const checkLogin=()=>{
  const loggedUser = window.localStorage.getItem('loggedUser')
  if(loggedUser){
    const user = JSON.parse(loggedUser)
    setUser(user)
  }
}
useEffect(checkLogin,[])

/*==============FIRST FETCH DATA=====================================================*/
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
/*==============LOGOUT HANDLER=====================================================*/


  return (
    <div>
      { user!==null?
      <div>
      
        <LogoutForm user={user.username}/>
        <Blog user={user.username} blogs={blogs}/>
      </div>
      :
      <LoginForm username={username} password={password} setUsername={handleUsername} setPassword={handlePassword} handleLogin={handleLogin}/>
      }
    </div>
  )
}

export default App
