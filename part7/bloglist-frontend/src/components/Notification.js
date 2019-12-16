import React from 'react'
import {connect} from 'react-redux'

const Notification = (props) => {
    const notifications = props.notifications

    if (notifications.message === null){
        return null
    }

    return (
        <div className='error'>
            {notifications.message}
        </div>
    )
}

const mapStateToProps = (state) =>{
    return {
        notifications:state.notifications
    }
}

const connectedNotification = connect(mapStateToProps)(Notification)
export default connectedNotification