import React from 'react'

const Search = (props) => {
  const {value} = props
  const {onChange} = props
  return(
    <div>
      <p>Search by name: </p>
      <input value={value} onChange={onChange}/>
    </div>
  )
}

export default Search
