import React from 'react'
import {connect} from 'react-redux'

const UserBlogs = (props) => {
    const {id} = props
    const user = (id)=>{
        return props.userList.find(user=>user.id===id)
    }
    const blogList = (id)=>{
        return(
            user(id).blogs.map(blog=>
                <li key={blog.id}>{blog.title}</li>
            )
        )
    }
    
    return (
        <div>
        {props.userList?
        <div>
            <h2>Blogs created by {user(id).username}</h2>
            <ul>
                {blogList(id)}
            </ul>
        </div>
        :null}
        </div>
    )
}
const mapStateToProps = (state) =>{
    return{
        userList:state.userList
    }
}
const dispatchToProps = {
}
export default connect(mapStateToProps,dispatchToProps)(UserBlogs)
