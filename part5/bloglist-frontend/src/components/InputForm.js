import React from 'react'

const InputForm = (props) => {
    const {handleInput} = props
    const {title} = props
    delete title.reset
    const {author} = props
    delete author.reset
    const {url} = props
    delete url.reset

    return (
        <div>
            <h1>New Blog</h1>
            <form onSubmit={handleInput}>
                <div>
                Title:
                    <input {...title}></input>
                </div>
                <div>
                Author:
                    <input {...author}></input>
                </div>
                <div>
                url:
                    <input {...url}></input>
                </div>
                <button type="submit">Create</button>
            </form>
        </div>
    )
}

export default InputForm
