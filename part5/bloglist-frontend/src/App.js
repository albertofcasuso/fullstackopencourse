import React,{useState,useEffect} from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import LogoutForm from './components/LogoutForm'
import InputForm from './components/InputForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import {useField} from './hooks'

//import logo from './logo.svg';
import './App.css'

const App = () => {
/*==============STATE CONSTANTS=====================================================*/
    const [blogs,setBlogs] = useState([])

    const [user,setUser] = useState(null)

    const [errorMessage, setErrorMessage] = useState(null)

    const username = useField('text')
    const password = useField('password')
    const title = useField('text')
    const author = useField('text')
    const url = useField('url')

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

    /*==============FIRST DATA FETCH=====================================================*/
    const fetchData = () =>{
        blogService.getAll().then(blog=> setBlogs(blog))
    }
    useEffect(fetchData,[])

    /*==============LOGIN FORM HANDLERS====================================================*/
    const handleLogin = async (event)=>{
        event.preventDefault()
        try{
            const user = await loginService.login({username:username.value,password:password.value})
            window.localStorage.setItem('loggedUser',JSON.stringify(user))
            setUser(user)
            username.reset()
            password.reset()
            setErrorMessage(`Welcome ${user.username}`)
            setTimeout(() => {setErrorMessage(null)}, 3000)
        }catch(error){
            setErrorMessage('Incorrect login')
            setTimeout(() => {setErrorMessage(null)}, 3000)
        }
    }
    /*==============INPUT HANDLERS=====================================================*/
    const handleInput = async (event) =>{
        event.preventDefault()
        const newBlog = {
            title:title.value,
            author:author.value,
            url:url.value
        }
        try{
            const response = await blogService.postBlog(newBlog,user.token)
            setBlogs(blogs.concat(response))
            setErrorMessage(`New blog added, ${response.title} by ${response.author}`)
            setTimeout(() => {setErrorMessage(null)}, 3000)
        }catch(error){
            console.log('error on the frontend', error)
        }
    }
    /*================================DELETE HANDLER=================================================*/
    const deleteHandler = async (id) =>{
        const blogToDelete = blogs.filter(blog=>blog.id===id?blog:null)
        const confirmation = window.confirm(`Do you want to remove ${blogToDelete[0].title}?`)
        if(confirmation){
            try{
                const response = await blogService.deleteBlog(id,user.token)
                if(response.status === 204){
                    const newBlogList = blogs.filter(blog=>blog.id === id?null:blog)
                    setBlogs(newBlogList)
                }
            }catch(error){
                console.log('error', error.message)
            }
        }else{return null}
    }
    /*=================================================================================*/
    return (
        <div>
            { user!==null?
                <div>
                    <LogoutForm user={user.username}/>
                    <Notification message={errorMessage}/>
                    <Togglable buttonLabel='new blog'>
                        <InputForm handleInput={handleInput} title={title} author={author} url={url}/>
                    </Togglable>
                    <Blog user={user} blogs={blogs} deleteHandler={deleteHandler}/>
                </div>
                :
                <div>
                    <Notification message={errorMessage}/>
                    <LoginForm username={username} password={password} handleLogin={handleLogin}/>
                </div>
            }
        </div>
    )
}

export default App