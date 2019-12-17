import React,{useEffect} from 'react'
import {connect} from 'react-redux'
import {getAll} from '../reducers/userListReducer'

const UserList = (props) => {
    const getAll =()=>{
        props.getAll()
    }
    useEffect(getAll,[])
    
    const userList = props.userList?props.userList.map(user=>{
        return(
            <tr key={user.id}>
                <td>{user.username}</td>
                <td>{user.blogs.length}</td>
            </tr>
        )
    })
    :null
    return (
        <div>
        <table>
            <thead>
                <tr>
                    <td><h3>Username</h3></td>
                    <td><h3>Blogs Created</h3></td>
                </tr>
            </thead>
            <tbody>
                {userList}
            </tbody>
        </table>
        </div>
    )
}
const mapStateToProps = (state,ownProps) =>{
    return{
        userList:state.userList
    }
}
const mapDispatchToProps = {
    getAll
}
export default connect(mapStateToProps,mapDispatchToProps)(UserList)
