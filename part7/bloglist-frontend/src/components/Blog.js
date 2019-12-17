import React,{useEffect} from 'react'
import Post from './Post'
import {connect} from 'react-redux'
import {getAll} from '../reducers/blogReducer'

const Blog = (props) => {
    const blogs = props.blogs
    const {deleteHandler} = props
    const user = props.user
    /*==============FIRST DATA FETCH=====================================================*/
    const fetchData = () =>{
        props.getAll()
    }
    useEffect(fetchData,[])
    const sortedBlogs = blogs.sort((a,b)=>(a.likes>b.likes?a:b))
    const blogList = sortedBlogs.map(blog=>{
        return (
            <div key={blog.id}>
                <Post postInfo = {blog} deleteHandler={deleteHandler} user={user}/>
            </div>
        )
    })

    return(
        <div>
            <h1>Blog List</h1>
            {blogList}
        </div>
    )
}
const mapStateToProps = (state)=>{
    return{
        blogs:state.blogs,
        user:state.user
    }
}
const mapDispatchToProps = {
    getAll
}
export default connect(mapStateToProps,mapDispatchToProps)(Blog)