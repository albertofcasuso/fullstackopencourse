import React,{useEffect} from 'react'
import Post from './Post'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {getAllBlogs} from '../reducers/blogReducer'

const Blog = (props) => {
    const blogs = props.blogs

    /*==============FIRST DATA FETCH=====================================================*/
    const fetchData = () =>{
        props.getAllBlogs()
    }
    useEffect(fetchData,[])
    
    const sortedBlogs = blogs.sort((a,b)=>(a.likes>b.likes?a:b))
    const blogList = sortedBlogs.map(blog=>{
        return (
            <div key={blog.id}>
                <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
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
    getAllBlogs
}
export default connect(mapStateToProps,mapDispatchToProps)(Blog)