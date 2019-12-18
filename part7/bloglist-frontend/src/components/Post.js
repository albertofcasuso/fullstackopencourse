import React from 'react'
import {useParams} from 'react-router-dom'
import {connect} from 'react-redux'

const Post = (props) => {
    const {id} = useParams()
    const post = (id)=>{
        return props.blogs.find(post=>post.id===id)
    }
    const postInfo = post(id)
    console.log(postInfo.comments)
    return (
        <div>
        {postInfo?
            <div id={postInfo.id}>
                <h2>{postInfo.title}</h2>
                <p>Author:{postInfo.author}</p>
                <p>Likes: {postInfo.likes} <button>Like this blog</button> </p>
                <p>url:<a href={postInfo.url}>{postInfo.url}</a></p>
                <h2>Comments</h2>
                <p>{postInfo.comments}</p>
            </div>
            :null}
        </div>
    )
}
const mapStateToProps = (state) =>{
    return{
        blogs:state.blogs
    }
}
export default connect(mapStateToProps)(Post)