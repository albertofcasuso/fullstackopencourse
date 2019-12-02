import React,{useState,useEffect} from 'react'
import blogService from './services/blogs'
import Blog from './components/Blog'
//import logo from './logo.svg';
//import './App.css';

const App = () => {
  const [blogs,setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const isLoggedIn = false

  const fetchData = () =>{
    blogService.getAll().then(blog=> setBlogs(blog))
  }
  useEffect(fetchData,[])

  const handleLogin = (event)=>{
    event.preventDefault()
    console.log('Logging in as',username,password)
  }

  const logInForm = () =>{
    return (
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
    )
  }

  return (
    <div>
    {isLoggedIn?
    <Blog blogs={blogs}/>
    :logInForm()
    }
    </div>
  )
}

export default App
