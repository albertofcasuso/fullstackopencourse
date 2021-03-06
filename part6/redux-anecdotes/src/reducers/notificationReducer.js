/* eslint-disable default-case */
const initialNotification = null

const asObject = (notification) => {
    return {
        message:notification
    }
}

export const setNotification = (message,time)=>{
    return async dispatch=>{
        dispatch({
            type:'SET_NOTIFICATION',
            data:message
        })
        setTimeout(()=>{
            dispatch({
                type:'REMOVE_NOTIFICATION',
                data:null
            })
        },time*1000)
    }
}

const initialState = asObject(initialNotification)

const notificationReducer = (state = initialState,action) =>{
    switch(action.type){
        case 'SET_NOTIFICATION':
            const newState = asObject(action.data)
            return newState
        case 'REMOVE_NOTIFICATION':
            const nullState = asObject(action.data)
            return nullState
    }
    return state
}

export default notificationReducer