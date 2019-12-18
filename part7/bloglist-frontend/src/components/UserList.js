import React,{useEffect} from 'react'
import {connect} from 'react-redux'
import {Link,useRouteMatch} from 'react-router-dom'
import {getAll} from '../reducers/userListReducer'

const UserList = (props) => {
    const match = useRouteMatch()
    
    const getAll =()=>{
        props.getAll()
    }
    useEffect(getAll,[])

    const userList = props.userList?props.userList.map(user=>{
        return(
            <tr key={user.id}>
                <td><Link to={`${match.path}/${user.id}`}>{user.username}</Link></td>
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
                    <td></td>
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
const mapStateToProps = (state) =>{
    return{
        userList:state.userList
    }
}
const mapDispatchToProps = {
    getAll
}
export default connect(mapStateToProps,mapDispatchToProps)(UserList)
