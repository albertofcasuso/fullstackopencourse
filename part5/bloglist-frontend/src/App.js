import React,{useState,useEffect} from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import Blog from './components/Blog'
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

/*==============LOGIN FORM=====================================================*/
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

  const logInForm = () =>{
    return (
      <div>
        <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div>
        username
          <input type="text" value={username} onChange={({target})=>setUsername(target.value)}></input>
        </div>
        <div>
        password
          <input type="password" value={password} onChange={({target})=>setPassword(target.value)}></input>
        </div>
        <button type="submit">login</button>
      </form>
      </div>
    )
  }
/*==============LOGOUT HANDLER=====================================================*/
const logout = () =>{
  window.localStorage.removeItem('loggedUser')
  window.location.reload()
}

/*==============BLOG LIST=====================================================*/
  const blogList = () =>{
    return (
      <div>
      <h1>Blog List</h1>
      <p>{user.username} is logged in</p>
      <button onClick={logout}>Logout</button>
        <Blog blogs={blogs}/>
      </div>
    )
  }

  return (
    <div>
    {user!==null?
    blogList()
    :logInForm()
    }
    </div>
  )
}

export default App
