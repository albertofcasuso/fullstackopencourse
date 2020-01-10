import React, { useState } from 'react'

const EditAuthor = (props) => {
  const [author, setAuthor] = useState('')
  const [name, setName] = useState('')

  const submit = async (e) => {
    e.preventDefault()
    await props.editAuthor({
      variables:{name,date:author}
    })
    setAuthor('')

  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          Name
          <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div>
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