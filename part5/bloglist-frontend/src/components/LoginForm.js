import React from 'react'
import propTypes from 'prop-types'

const LoginForm = (props) => {
    const {username} = props
    const {password} = props
    const {handleLogin} = props

    delete username.reset
    delete password.reset

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <div>
                username
                    <input {...username}></input>
                </div>
                <div>
                password
                    <input {...password}></input>
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

LoginForm.propTypes={
    handleLogin:propTypes.func.isRequired,

    username:propTypes.shape({
        type:propTypes.string,
        value:propTypes.string,
        onChange:propTypes.func
    }),

    password:propTypes.shape({
        type:propTypes.string,
        value:propTypes.string,
        onChange:propTypes.func
    })
}

export default LoginForm
