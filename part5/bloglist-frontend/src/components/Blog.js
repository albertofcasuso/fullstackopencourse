import React from 'react'

const Blog = (props) => {
  const {blogs} = props
  const blogList = blogs.map(blog=>
    <li key={blog.id}>{blog.title} {blog.author}</li>)
  return(
    <div>
    <h1>Blog List</h1>
    <ul>{blogList}</ul>
    </div>
  )
  }

export default Blog