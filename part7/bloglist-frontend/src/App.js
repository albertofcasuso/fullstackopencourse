import React,{useState,useEffect} from 'react'
import {connect} from 'react-redux'
import blogService from './services/blogs'
import loginService from './services/login'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import LogoutForm from './components/LogoutForm'
import InputForm from './components/InputForm'
import Notification from './components/Notification'
import {setNotification} from './reducers/notificationReducer'
import Togglable from './components/Togglable'
import {useField, useResource} from './hooks'

import './App.css'

const App = (props) => {
    
/*==============STATE CONSTANTS=====================================================*/
    const [blogs,setBlogs] = useState([])

    const [user,setUser] = useState(null)

    const username = useField('text')
    const password = useField('password')
    const title = useField('text')
    const author = useField('text')
    const url = useField('url')

    const resources = useResource()

    /*==============CHECK LOGIN=====================================================*/
    const checkLogin=()=>{
        const loggedUser = window.localStorage.getItem('loggedUser')
        if(loggedUser){
            const user = JSON.parse(loggedUser)
            setUser(user)
            props.setNotification(`Welcome back ${user.username}`,5)
        }
    }
    useEffect(checkLogin,[])

    /*==============FIRST DATA FETCH=====================================================*/
    const fetchData = () =>{
        resources.getAll().then(blog=> setBlogs(blog))
    }
    useEffect(fetchData,[])

    /*==============LOGIN FORM HANDLERS====================================================*/
    const handleLogin = async (event)=>{
        event.preventDefault()
        try{
            const user = await loginService.login({username:username.value,password:password.value})
            window.localStorage.setItem('loggedUser',JSON.stringify(user))
            console.log(user)
            setUser(user)
            username.reset()
            password.reset()
            props.setNotification(`Welcome ${user.username}`,5)
        }catch(error){
            props.setNotification('Incorrect login',5)
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
            const response = await resources.postBlog(newBlog,user.token)
            setBlogs(blogs.concat(response))
            props.setNotification(`New blog added, ${response.title} by ${response.author}`,5)
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
                    <Notification />
                    <Togglable buttonLabel='new blog'>
                        <InputForm handleInput={handleInput} title={title} author={author} url={url}/>
                    </Togglable>
                    <Blog user={user} blogs={blogs} deleteHandler={deleteHandler}/>
                </div>
                :
                <div>
                    <Notification />
                    <LoginForm username={username} password={password} handleLogin={handleLogin}/>
                </div>
            }
        </div>
    )
}
const mapDispatchToProps = {
    setNotification
}

export default connect(null,mapDispatchToProps)(App)