import React from 'react'
import Post from './Post'

const Blog = (props) => {
  const {blogs} = props

  const blogList = blogs.map(blog=>{
    return (
      <div key={blog.id}>
        <Post postInfo = {blog} />
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