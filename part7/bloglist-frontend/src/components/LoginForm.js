import React from 'react'
import propTypes from 'prop-types'
import {connect} from 'react-redux'
import {setUser,loginUser} from '../reducers/userReducer'
import {useField} from '../hooks'
import {setNotification} from '../reducers/notificationReducer'

const LoginForm = (props) => {
    const [username] = useField('text')
    const [password] = useField('password')

    const handleLogin = async(event)=>{
        event.preventDefault()
        try{
            const user =await props.loginUser({username:username.value,password:password.value})
            props.setNotification(`Welcome ${user.username}`,5)
        }catch(error){
            console.log(error)
            props.setNotification('Incorrect login',5)
        }
    }

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <div>
                username
                    <input {...username}/>
                </div>
                <div>
                password
                    <input {...password}/>
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

LoginForm.propTypes={

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

const mapDispatchToProps = {
    setNotification,
    setUser,
    loginUser
}
const mapStateToProps = (state)=>{
    return {
        notification:state.notification,
        user:state.user
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(LoginForm)
