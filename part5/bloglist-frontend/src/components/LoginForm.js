import React from 'react'
import propTypes from 'prop-types'

const LoginForm = (props) => {
    const {username} = props
    const {password} = props
    const {setUsername} = props
    const {setPassword} = props
    const {handleLogin} = props

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <div>
                username
                    <input type="text" value={username} onChange={setUsername}></input>
                </div>
                <div>
                password
                    <input type="password" value={password} onChange={setPassword}></input>
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

LoginForm.propTypes={
    handleLogin:propTypes.func.isRequired,
    setPassword:propTypes.func.isRequired,
    setUsername: propTypes.func.isRequired,
    username: propTypes.string.isRequired,
    password:propTypes.string.isRequired
}

export default LoginForm
