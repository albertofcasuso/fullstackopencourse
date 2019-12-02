import React from 'react'

const Blog = (props) => {
  const {blogs} = props
  const {user} = props
  const blogList = blogs.map(blog=>
    <li key={blog.id}>{blog.title} {blog.author}</li>)

  return(
    <div>
    <h1>Blog List</h1>
    <p>{user.username} logged in</p>
    <ul>{blogList}</ul>
    </div>
  )
  }

export default Blog