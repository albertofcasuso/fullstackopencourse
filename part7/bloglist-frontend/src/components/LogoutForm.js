import React from 'react'
import {connect} from 'react-redux'

const LogoutForm = (props) => {
    const user = props.user

    const logout = () =>{
        window.localStorage.removeItem('loggedUser')
        window.location.reload()
    }

    return (
        <div>
            <p>{user.username} is logged in</p>
            <button onClick={logout}>Logout</button>
        </div>
    )
}
const mapStateToProps = (state)=>{
    return{
        user:state.user
    }
}
export default connect(mapStateToProps)(LogoutForm)
