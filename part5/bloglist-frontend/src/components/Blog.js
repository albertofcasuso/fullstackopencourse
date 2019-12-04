import React from 'react'
import Post from './Post'

const Blog = (props) => {
  const {blogs} = props
  const {deleteHandler} = props
  const {user} = props

  const sortedBlogs = blogs.sort((a,b)=>(a.likes>b.likes?-1:1))
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

export default Blog