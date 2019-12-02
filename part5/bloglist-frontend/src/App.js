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

  const fetchData = () =>{
    blogService.getAll().then(blog=> setBlogs(blog))
  }
  useEffect(fetchData,[])

/*==============LOGIN FORM=====================================================*/

  const handleLogin = async (event)=>{
    event.preventDefault()
    try{
      const user = await loginService.login({username,password})
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

  return (
    <div>
    {user!==null?
    <Blog blogs={blogs} user={user}/>
    :logInForm()
    }
    </div>
  )
}

export default App
