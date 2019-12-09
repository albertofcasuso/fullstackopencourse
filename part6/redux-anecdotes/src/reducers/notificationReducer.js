/* eslint-disable default-case */
const initialNotification = [
    'Insert an incredible notification here'
]

const asObject = (notification) => {
    return {
        message:notification
    }
}
/*
export const switchNotification = (content)=>{
    return{
        type:'ALL'
    }
}
*/
const initialState = initialNotification.map(asObject)

const notificationReducer = (state = initialState,action) =>{
    switch(action.type){
        case 'ALL':
            return state
    }
    return state
}

export default notificationReducer