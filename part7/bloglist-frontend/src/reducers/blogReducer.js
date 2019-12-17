import {useResource} from '../hooks'
const resources = useResource()

export const getAllBlogs = ()=>{
    return async dispatch =>{
        const blogs = await resources.getAll()
        dispatch({
            type:'INIT_BLOGS',
            data:blogs
        })
    }
}

const blogReducer = (state=[],action)=>{
    switch (action.type){
        case 'INIT_BLOGS':
            return action.data
        default:
            return state
    }
}
export default blogReducer