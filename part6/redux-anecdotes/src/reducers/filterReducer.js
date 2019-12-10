/* eslint-disable default-case */
const initialFilter =''

const asObject = (query) => {
    return {
        filter:query
    }
}

export const setFilter = (query)=>{
    return{
        type:'SET_FILTER',
        data:query
    }
}

const initialState = asObject(initialFilter)

const filterReducer = (state = initialState,action) =>{
    switch(action.type){
        case 'SET_FILTER':
            const newState = asObject(action.data)
            return newState
    }
    return state
}

export default filterReducer