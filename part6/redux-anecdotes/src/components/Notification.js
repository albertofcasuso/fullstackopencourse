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

  if (notifications.message===null){
    return null
  }

  return (
    <div style={style}>
      <p>{notifications.message}</p>
    </div>
  )
}

export default Notification