import React from 'react'
import {connect} from 'react-redux'
//import switchNotification from '../reducers/notificationReducer'

const Notification = (props) => {
  const notifications = props.notifications
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  if (notifications.message===null){
    return null
  }

  return (
    <div style={style}>
      <p>{notifications.message}</p>
    </div>
  )
}
const mapStateToProps = (state)=>{
  return {
    notifications:state.notifications
  }
}
const connectedNotification = connect(mapStateToProps)(Notification)

export default connectedNotification