import React, {useState} from 'react'

const Post = (props) => {
    const {postInfo} = props

    const [visible, setVisible] = useState(false)

    const blogStyle = {
      paddingTop: 10,
      paddingLeft: 2,
      border: 'solid',
      borderWidth: 1,
      marginBottom: 5
    }
  
    const hideWhenVisible = { display: visible ? 'none' : '' }
    const showWhenVisible = { display: visible ? '' : 'none' }
  
    const toggleVisibility = () => {
      setVisible(!visible)
    }

    const likeHandler = (event) =>{
        event.preventDefault()
    }


    return (
        <div style = {blogStyle}>
            <div style={hideWhenVisible}>
                <p onClick={toggleVisibility}>{postInfo.title}</p>
            </div>

            <div  style={showWhenVisible} id={postInfo.id}>
                <p onClick={toggleVisibility}>{postInfo.title}</p>
                <p>Author:{postInfo.author}</p>
                <p>Likes: {postInfo.likes} <button onClick={likeHandler}>Like this blog</button> </p>
                <p>url:<a href={postInfo.url}>{postInfo.url}</a></p>
            </div>
        </div>
    )
}

export default Post
