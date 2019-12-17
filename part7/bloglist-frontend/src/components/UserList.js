import React,{useEffect} from 'react'
import {connect} from 'react-redux'
import {getAll} from '../reducers/userListReducer'

const UserList = (props) => {
    console.log(props)
    const getAll =()=>{
        props.getAll()
    }
    useEffect(getAll,[])
    
    const userList = props.userList?props.userList.map(user=>{
        return(
            <tr>
                <td>{user.username}</td>
                <td>{user.blogs.length}</td>
            </tr>
        )
    })
    :null
    return (
        <div>
        <table>
            {userList}
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
