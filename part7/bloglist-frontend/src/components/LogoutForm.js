import React from 'react'

const LogoutForm = (props) => {
    const {user} = props

    const logout = () =>{
        window.localStorage.removeItem('loggedUser')
        window.location.reload()
    }

    return (
        <div>
            <p>{user} is logged in</p>
            <button onClick={logout}>Logout</button>
        </div>
    )
}

export default LogoutForm
