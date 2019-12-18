import React,{useState,useEffect} from 'react'
import {Switch,Route} from 'react-router-dom'
import {connect} from 'react-redux'
import blogService from './services/blogs'
import Blog from './components/Blog'
import Menu from './components/Menu'
import LoginForm from './components/LoginForm'
import LogoutForm from './components/LogoutForm'
import InputForm from './components/InputForm'
import Togglable from './components/Togglable'
import UserList from './components/UserList'
import Notification from './components/Notification'
import {setNotification} from './reducers/notificationReducer'
import {setUser} from './reducers/userReducer'
import {useField, useResource} from './hooks'
import {getAllBlogs} from './reducers/blogReducer'
import UserBlogs from './components/UserBlogs'
import Post from './components/Post'

import './App.css'

const App = (props) => {
    const user = props.user
/*==============STATE CONSTANTS=====================================================*/
    const [blogs,setBlogs] = useState([])

    const [title] = useField('text')
    const [author] = useField('text')
    const [url] = useField('url')

    const resources = useResource()

    /*==============CHECK LOGIN=====================================================*/
    const checkLogin=()=>{
        const loggedUser = window.localStorage.getItem('loggedUser')
        if(loggedUser){
            const user = JSON.parse(loggedUser)
            props.setUser(user)
            props.setNotification(`Welcome back ${user.username}`,5)
        }
    }
    useEffect(checkLogin,[])

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
            setBlogs(props.blogs.concat(response))
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
                    <LogoutForm/>
                    <Notification />
                    <Menu/>
                    <Switch>
                        <Route exact path='/'>
                            <div>
                                <Togglable buttonLabel='new blog'>
                                <InputForm handleInput={handleInput} title={title} author={author} url={url}/>
                                </Togglable>
                                <Blog deleteHandler={deleteHandler}/>
                            </div>

                        </Route>
                    
                        <Route path='/blogs/:id'>
                            <Post/>
                        </Route>

                        <Route exact path='/users'>
                            <UserList/>
                        </Route>

                        <Route path='/users/:id'>
                            <UserBlogs />
                        </Route>
                    </Switch>
                </div>
                :
                <div>
                    <Notification />
                    <LoginForm/>
                </div>
            }
        </div>
    )
}
const mapDispatchToProps = {
    setNotification,
    setUser,
    getAllBlogs
}
const mapStateToProps = (state)=>{
    return {
        blogs:state.blogs,
        user:state.user,
        userList:state.userList
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(App)