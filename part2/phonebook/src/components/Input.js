import React from 'react'

const Input = (props) => {
  const {onSubmit} = props
  const {nameValue} = props
  const {numberValue} = props
  const {numberChange} = props
  const {nameChange} = props

  return(
    <div>
    <form onSubmit={onSubmit}>
      <div>
        name: <input value={nameValue} onChange={nameChange}/>
      </div>
      <div>
        number: <input value={numberValue} onChange={numberChange}/>
     </div>
      <div>
        <button type="submit">Add</button>
      </div>
    </form>
    </div>
  )
}

export default Input
