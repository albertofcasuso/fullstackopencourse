import { createStore,combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import notificationReducer from './reducers/notificationReducer'
import blogReducer from './reducers/blogReducer'
import userReducer from './reducers/userReducer'
import userListReducer from './reducers/userListReducer'

const reducer = combineReducers({
    notifications:notificationReducer,
    blogs:blogReducer,
    user:userReducer,
    userList:userListReducer
  })

const store = createStore(reducer,applyMiddleware(thunk))

export default store