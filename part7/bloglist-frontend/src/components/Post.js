import React from 'react'
import {useParams} from 'react-router-dom'
import {connect} from 'react-redux'

const Post = (props) => {
    const {id} = useParams()
    const post = (id)=>{
        return props.blogs.find(post=>post.id===id)
    }
    console.log(props.blogs)
    const postInfo = post(id)
    return (
        <div>
        {postInfo?
            <div id={postInfo.id}>
                <h2>{postInfo.title}</h2>
                <p>Author:{postInfo.author}</p>
                <p>Likes: {postInfo.likes} <button>Like this blog</button> </p>
                <p>url:<a href={postInfo.url}>{postInfo.url}</a></p>
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