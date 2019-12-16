import React, {useState} from 'react'
import blogService from '../services/blogs'

const Post = (props) => {
    const {postInfo} = props
    const {deleteHandler} = props
    const {user} = props

    const [visible, setVisible] = useState(false)
    const [likes,setLikes] = useState(postInfo.likes)

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

    const likeHandler = async (event) =>{
        event.preventDefault()
        const likedBlog = {
            id:postInfo.id,
            title:postInfo.title,
            user:postInfo.user.id,
            likes:likes+1,
            author:postInfo.author,
            url:postInfo.url
        }
        try{
            const response = await blogService.likeBlog(likedBlog)
            setLikes(response.likes)
        }catch(error){
            console.log('error', error.message)
        }
    }


    return (
        <div style = {blogStyle}>
            <div style={hideWhenVisible}>
                <p onClick={toggleVisibility}>{postInfo.title}</p>
            </div>

            <div  style={showWhenVisible} id={postInfo.id}>
                <p onClick={toggleVisibility}>{postInfo.title}</p>
                <p>Author:{postInfo.author}</p>
                <p>Likes: {likes} <button onClick={likeHandler}>Like this blog</button> </p>
                <p>url:<a href={postInfo.url}>{postInfo.url}</a></p>
                {user.username === postInfo.user.username?<button onClick={()=>deleteHandler(postInfo.id)}>Delete</button>:null}
            </div>
        </div>
    )
}

export default Post