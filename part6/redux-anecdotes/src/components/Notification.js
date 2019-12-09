import React from 'react'
//import switchNotification from '../reducers/notificationReducer'

const Notification = (props) => {
  const store = props.store
  const notifications = store.getState().notifications
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return (
    <div style={style}>
      <p>{notifications.map(notification=>notification.message)}</p>
    </div>
  )
}

export default Notification