import React from 'react'
import {setFilter} from '../reducers/filterReducer'

const Filter = (props) => {
    const store = props.store

    const style = {
        marginBottom: 10
      }

    const handleChange = (event)=>{
        store.dispatch(setFilter(event.target.value))
    }

    return (
        <div style={style}>
            filter <input name='filter' onChange={handleChange} />
        </div>
    )
}

export default Filter
