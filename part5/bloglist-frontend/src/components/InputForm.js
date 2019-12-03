import React from 'react'

const InputForm = (props) => {
    const {handleInput} = props
    const {title} = props
    const {setTitle} = props
    const {author} = props
    const {setAuthor} = props
    const {url} = props
    const {setUrl} = props

    return (
        <div>
            <h1>New Blog</h1>
            <form onSubmit={handleInput}>
                <div>
                Title:
                    <input type="text" value={title} onChange={setTitle}></input>
                </div>
                <div>
                Author:
                    <input type="text" value={author} onChange={setAuthor}></input>
                </div>
                <div>
                url:
                    <input type="text" value={url} onChange={setUrl}></input>
                </div>
                <button type="submit">Create</button>
            </form>
        </div>
    )
}

export default InputForm
