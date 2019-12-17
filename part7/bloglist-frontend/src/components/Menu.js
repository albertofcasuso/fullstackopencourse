import React from 'react'
import {
    BrowserRouter as Router,
    Route, Link, Redirect, withRouter
  } from 'react-router-dom'

const Menu = (props) => {
    const padding = {
        paddingRight: 10
      }
    return (
    <div>
      <Link to='/' style={padding}>Blog List</Link>
      <Link to='/users' style={padding}>Users</Link>
    </div>
    )
}

export default Menu
