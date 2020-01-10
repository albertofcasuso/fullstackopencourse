import React, { useState } from 'react'

const EditAuthor = (props) => {
  const [author, setAuthor] = useState('')
  const [selectAuthor, setSelectAuthor] = useState('Robert Martin')

  const submit = async (e) => {
    e.preventDefault()
    await props.editAuthor({
      variables:{name:selectAuthor,date:author}
    })
    setAuthor('')

  }
  const authorList = props.authors.map(author=>{
    return <option value={author.name} key={author.name}>{author.name}</option>
})
  return (
    <div>
    <select value={selectAuthor} onChange={({target})=>setSelectAuthor(target.value)}>
            {authorList}
    </select>
      <form onSubmit={submit}>
        <div>
          DOB
          <input
            type='number'
            value={author}
            onChange={({ target }) => setAuthor(target.valueAsNumber)}
          />
        </div>
        <button type='submit'>create book</button>
      </form>
    </div>
  )
}

export default EditAuthor