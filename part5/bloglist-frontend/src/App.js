import React,{useState,useEffect} from 'react'
import blogService from './services/blogs'
import Blog from './components/Blog'
//import logo from './logo.svg';
//import './App.css';

const App = () => {
  const [blogs,setBlogs] = useState([])

  const fetchData = () =>{
    blogService.getAll().then(blog=> setBlogs(blog))
  }
  useEffect(fetchData,[])

  return (
    <div>
      <Blog blogs={blogs}/>
    </div>
  )
}

export default App
