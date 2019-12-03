import React from 'react'

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

export default LoginForm
