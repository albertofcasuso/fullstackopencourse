import React from 'react'

const Blog = (props) => {
  const {blogs} = props
  
  const blogList = blogs.map(blog=>{
    return <li key={blog.id}>{blog.title} {blog.author}</li>
  })

  return(
    <div>
    <ul>{blogList}</ul>
    </div>
  )
  }

export default Blog